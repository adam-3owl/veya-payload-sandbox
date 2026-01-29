import { format, subDays, startOfDay } from 'date-fns'
import type {
  SampleOverviewData,
  Location,
  DailyMetrics,
  ProductSale,
} from './types'

// Seeded random number generator for deterministic output
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff
    return this.seed / 0x7fffffff
  }

  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  float(min: number, max: number): number {
    return this.next() * (max - min) + min
  }

  pick<T>(arr: T[]): T {
    return arr[this.range(0, arr.length - 1)]
  }

  shuffle<T>(arr: T[]): T[] {
    const result = [...arr]
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.range(0, i)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }
}

// Location data
const LOCATIONS: Location[] = [
  { id: 'loc-001', name: 'Downtown Manhattan', timezone: 'America/New_York' },
  { id: 'loc-002', name: 'Brooklyn Heights', timezone: 'America/New_York' },
  { id: 'loc-003', name: 'Midtown East', timezone: 'America/New_York' },
  { id: 'loc-004', name: 'West Village', timezone: 'America/New_York' },
  { id: 'loc-005', name: 'Upper East Side', timezone: 'America/New_York' },
  { id: 'loc-006', name: 'Financial District', timezone: 'America/New_York' },
  { id: 'loc-007', name: 'SoHo', timezone: 'America/New_York' },
  { id: 'loc-008', name: 'Chelsea', timezone: 'America/New_York' },
  { id: 'loc-009', name: 'Tribeca', timezone: 'America/New_York' },
  { id: 'loc-010', name: 'Williamsburg', timezone: 'America/New_York' },
  { id: 'loc-011', name: 'Astoria', timezone: 'America/New_York' },
  { id: 'loc-012', name: 'Park Slope', timezone: 'America/New_York' },
]

// Product catalog
interface Product {
  id: string
  name: string
  category: string
  basePrice: number
}

const PRODUCTS: Product[] = [
  // Bowls
  { id: 'prod-001', name: 'Mediterranean Bowl', category: 'Bowls', basePrice: 14.99 },
  { id: 'prod-002', name: 'Asian Fusion Bowl', category: 'Bowls', basePrice: 15.99 },
  { id: 'prod-003', name: 'Protein Power Bowl', category: 'Bowls', basePrice: 16.99 },
  { id: 'prod-004', name: 'Veggie Delight Bowl', category: 'Bowls', basePrice: 13.99 },
  { id: 'prod-005', name: 'Harvest Grain Bowl', category: 'Bowls', basePrice: 14.49 },
  // Salads
  { id: 'prod-006', name: 'Caesar Salad', category: 'Salads', basePrice: 12.99 },
  { id: 'prod-007', name: 'Greek Salad', category: 'Salads', basePrice: 11.99 },
  { id: 'prod-008', name: 'Kale & Quinoa Salad', category: 'Salads', basePrice: 13.49 },
  { id: 'prod-009', name: 'Cobb Salad', category: 'Salads', basePrice: 14.99 },
  { id: 'prod-010', name: 'Asian Chopped Salad', category: 'Salads', basePrice: 13.99 },
  // Drinks
  { id: 'prod-011', name: 'Fresh Lemonade', category: 'Drinks', basePrice: 4.99 },
  { id: 'prod-012', name: 'Green Smoothie', category: 'Drinks', basePrice: 7.99 },
  { id: 'prod-013', name: 'Iced Tea', category: 'Drinks', basePrice: 3.99 },
  { id: 'prod-014', name: 'Kombucha', category: 'Drinks', basePrice: 5.99 },
  { id: 'prod-015', name: 'Cold Brew Coffee', category: 'Drinks', basePrice: 5.49 },
  // Sides
  { id: 'prod-016', name: 'Sweet Potato Fries', category: 'Sides', basePrice: 5.99 },
  { id: 'prod-017', name: 'Hummus & Pita', category: 'Sides', basePrice: 6.99 },
  { id: 'prod-018', name: 'Roasted Vegetables', category: 'Sides', basePrice: 5.49 },
  { id: 'prod-019', name: 'Avocado Toast', category: 'Sides', basePrice: 7.99 },
  { id: 'prod-020', name: 'Soup of the Day', category: 'Sides', basePrice: 6.49 },
  // Desserts
  { id: 'prod-021', name: 'Chocolate Brownie', category: 'Desserts', basePrice: 4.99 },
  { id: 'prod-022', name: 'Fresh Fruit Cup', category: 'Desserts', basePrice: 5.99 },
  { id: 'prod-023', name: 'Acai Bowl', category: 'Desserts', basePrice: 9.99 },
  { id: 'prod-024', name: 'Chia Pudding', category: 'Desserts', basePrice: 6.99 },
  { id: 'prod-025', name: 'Cookie Trio', category: 'Desserts', basePrice: 4.49 },
]

// Hourly distribution weights (realistic lunch/dinner peaks)
const HOURLY_WEIGHTS = [
  0.02, 0.01, 0.01, 0.01, 0.01, 0.02, // 0-5 AM
  0.03, 0.05, 0.08, 0.06, 0.08, 0.15, // 6-11 AM
  0.18, 0.12, 0.08, 0.06, 0.08, 0.15, // 12-5 PM
  0.18, 0.15, 0.12, 0.08, 0.05, 0.03, // 6-11 PM
]

// Day of week multipliers (weekends slightly lower for business locations)
const DAY_OF_WEEK_MULTIPLIERS = [0.7, 1.0, 1.1, 1.0, 1.1, 1.2, 0.8] // Sun-Sat

function generateDailyMetrics(
  rng: SeededRandom,
  location: Location,
  dateStr: string,
  dayOfWeek: number,
  locationMultiplier: number
): DailyMetrics {
  const baseMultiplier = DAY_OF_WEEK_MULTIPLIERS[dayOfWeek] * locationMultiplier

  // Sessions (potential customers visiting)
  const baseSessions = rng.range(150, 400)
  const sessions = Math.round(baseSessions * baseMultiplier)

  // Orders by channel (conversion rate ~15-25%)
  const conversionRate = rng.float(0.15, 0.25)
  const totalOrders = Math.round(sessions * conversionRate)

  // Channel distribution
  const pickupShare = rng.float(0.45, 0.55)
  const deliveryShare = rng.float(0.30, 0.40)
  const cateringShare = 1 - pickupShare - deliveryShare

  const pickupOrders = Math.round(totalOrders * pickupShare)
  const deliveryOrders = Math.round(totalOrders * deliveryShare)
  const cateringOrders = Math.max(0, totalOrders - pickupOrders - deliveryOrders)

  // Revenue (AOV varies by channel)
  const pickupAOV = rng.float(18, 25)
  const deliveryAOV = rng.float(28, 38) // Higher AOV for delivery
  const cateringAOV = rng.float(85, 150) // Much higher for catering

  // Customers
  const returningRate = rng.float(0.35, 0.55)
  const returningOrders = Math.round(totalOrders * returningRate)
  const newOrders = totalOrders - returningOrders
  const loyaltyRedeems = Math.round(returningOrders * rng.float(0.2, 0.4))

  // Hourly distribution
  const hourlyOrders: number[] = []
  let remainingOrders = totalOrders

  for (let hour = 0; hour < 24; hour++) {
    if (hour === 23) {
      hourlyOrders.push(remainingOrders)
    } else {
      const hourOrders = Math.round(
        totalOrders * HOURLY_WEIGHTS[hour] * rng.float(0.8, 1.2)
      )
      const actualOrders = Math.min(hourOrders, remainingOrders)
      hourlyOrders.push(actualOrders)
      remainingOrders -= actualOrders
    }
  }

  // Platform distribution (orders by device/channel)
  const webDesktopShare = rng.float(0.15, 0.25)
  const webTabletShare = rng.float(0.05, 0.10)
  const webMobileShare = rng.float(0.20, 0.30)
  const nativeIosShare = rng.float(0.25, 0.35)
  const nativeAndroidShare = 1 - webDesktopShare - webTabletShare - webMobileShare - nativeIosShare

  return {
    date: dateStr,
    locationId: location.id,
    sessions,
    orders: {
      pickup: pickupOrders,
      delivery: deliveryOrders,
      catering: cateringOrders,
    },
    revenue: {
      pickup: Math.round(pickupOrders * pickupAOV * 100) / 100,
      delivery: Math.round(deliveryOrders * deliveryAOV * 100) / 100,
      catering: Math.round(cateringOrders * cateringAOV * 100) / 100,
    },
    customers: {
      newOrders,
      returningOrders,
      loyaltyRedeems,
    },
    hourlyOrders,
    platforms: {
      webDesktop: Math.round(totalOrders * webDesktopShare),
      webTablet: Math.round(totalOrders * webTabletShare),
      webMobile: Math.round(totalOrders * webMobileShare),
      nativeIos: Math.round(totalOrders * nativeIosShare),
      nativeAndroid: Math.round(totalOrders * Math.max(0.05, nativeAndroidShare)),
    },
  }
}

function generateProductSales(
  rng: SeededRandom,
  locationId: string,
  dateStr: string,
  totalOrders: number
): ProductSale[] {
  const sales: ProductSale[] = []

  // Each order has 1-4 items
  let remainingItems = Math.round(totalOrders * rng.float(1.8, 2.5))
  const shuffledProducts = rng.shuffle([...PRODUCTS])

  // Select 10-25 products that were sold that day
  const numProducts = rng.range(10, 25)
  const selectedProducts = shuffledProducts.slice(0, numProducts)

  for (const product of selectedProducts) {
    if (remainingItems <= 0) break

    // Popularity weighting - bowls and salads sell more
    let popularityMultiplier = 1
    if (product.category === 'Bowls') popularityMultiplier = 2.5
    else if (product.category === 'Salads') popularityMultiplier = 2.0
    else if (product.category === 'Drinks') popularityMultiplier = 1.8
    else if (product.category === 'Sides') popularityMultiplier = 1.2

    const baseUnits = rng.range(1, 15)
    const units = Math.min(
      Math.round(baseUnits * popularityMultiplier),
      remainingItems
    )

    if (units > 0) {
      const priceVariation = rng.float(0.95, 1.05) // Small price variations
      const revenue = Math.round(units * product.basePrice * priceVariation * 100) / 100

      sales.push({
        date: dateStr,
        locationId,
        productId: product.id,
        productName: product.name,
        category: product.category,
        units,
        revenue,
      })

      remainingItems -= units
    }
  }

  return sales
}

export function getSampleOverviewData(seed: number = 42): SampleOverviewData {
  const rng = new SeededRandom(seed)
  const today = startOfDay(new Date())
  const daysToGenerate = 120

  const dailyMetrics: DailyMetrics[] = []
  const productSales: ProductSale[] = []

  // Generate location multipliers (some locations perform better)
  const locationMultipliers = new Map<string, number>()
  for (const location of LOCATIONS) {
    locationMultipliers.set(location.id, rng.float(0.7, 1.3))
  }

  // Generate data for each day and location
  for (let dayOffset = daysToGenerate - 1; dayOffset >= 0; dayOffset--) {
    const date = subDays(today, dayOffset)
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayOfWeek = date.getDay()

    for (const location of LOCATIONS) {
      const multiplier = locationMultipliers.get(location.id) || 1
      const metrics = generateDailyMetrics(
        rng,
        location,
        dateStr,
        dayOfWeek,
        multiplier
      )
      dailyMetrics.push(metrics)

      const totalOrders =
        metrics.orders.pickup +
        metrics.orders.delivery +
        metrics.orders.catering

      const sales = generateProductSales(rng, location.id, dateStr, totalOrders)
      productSales.push(...sales)
    }
  }

  return {
    locations: LOCATIONS,
    dailyMetrics,
    productSales,
    generatedAt: new Date().toISOString(),
  }
}

// Export categories for filtering
export const PRODUCT_CATEGORIES = [
  'Bowls',
  'Salads',
  'Drinks',
  'Sides',
  'Desserts',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
