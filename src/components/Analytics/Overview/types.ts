// Analytics Overview Types

export interface Location {
  id: string
  name: string
  timezone: string
}

export type Channel = 'pickup' | 'delivery' | 'catering'

export interface DailyMetrics {
  date: string // ISO date string YYYY-MM-DD
  locationId: string
  sessions: number
  orders: {
    pickup: number
    delivery: number
    catering: number
  }
  revenue: {
    pickup: number
    delivery: number
    catering: number
  }
  customers: {
    newOrders: number
    returningOrders: number
    loyaltyRedeems: number
  }
  hourlyOrders: number[] // 24 elements for hours 0-23
  platforms: {
    webDesktop: number
    webTablet: number
    webMobile: number
    nativeIos: number
    nativeAndroid: number
  }
}

export interface ProductSale {
  date: string
  locationId: string
  productId: string
  productName: string
  category: string
  units: number
  revenue: number
}

export interface SampleOverviewData {
  locations: Location[]
  dailyMetrics: DailyMetrics[]
  productSales: ProductSale[]
  generatedAt: string
}

// Filter types
export type DateRangePreset = 'last7' | 'last30' | 'last90' | 'custom'
export type Interval = 'day' | 'week'
export type ChannelFilter = 'all' | Channel

export interface DateRange {
  start: Date
  end: Date
}

export interface FilterState {
  dateRangePreset: DateRangePreset
  customDateRange: DateRange | null
  interval: Interval
  locationIds: string[] // empty means all
  channel: ChannelFilter
}

// KPI types
export interface KPIData {
  revenue: number
  orders: number
  aov: number
  conversionRate: number
  sessions: number
}

export interface KPIWithChange extends KPIData {
  revenueChange: number
  ordersChange: number
  aovChange: number
  conversionRateChange: number
}

// Chart data types
export interface TimeSeriesPoint {
  date: string
  revenue: number
  orders: number
  previousRevenue?: number
  previousOrders?: number
}

export interface ChannelMixPoint {
  date: string
  pickup: number
  delivery: number
  catering: number
  total: number
}

export interface LocationPerformance {
  locationId: string
  locationName: string
  revenue: number
  orders: number
  aov: number
}

export interface ProductPerformance {
  productId: string
  productName: string
  category: string
  revenue: number
  units: number
}

export interface CustomerBreakdownPoint {
  date: string
  newOrders: number
  returningOrders: number
  loyaltyRedeems: number
  returningRate: number
}

export interface HeatmapCell {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  hour: number // 0-23
  orders: number
  intensity: number // 0-1 normalized
}

export type Platform = 'webDesktop' | 'webTablet' | 'webMobile' | 'nativeIos' | 'nativeAndroid'

export interface PlatformBreakdownPoint {
  date: string
  webDesktop: number
  webTablet: number
  webMobile: number
  nativeIos: number
  nativeAndroid: number
}
