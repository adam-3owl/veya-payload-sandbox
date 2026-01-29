import {
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  format,
  parseISO,
  isWithinInterval,
  differenceInDays,
  getDay,
  getHours,
} from 'date-fns'
import type {
  SampleOverviewData,
  DailyMetrics,
  ProductSale,
  DateRange,
  DateRangePreset,
  Interval,
  ChannelFilter,
  FilterState,
  KPIData,
  KPIWithChange,
  TimeSeriesPoint,
  ChannelMixPoint,
  LocationPerformance,
  ProductPerformance,
  CustomerBreakdownPoint,
  HeatmapCell,
  Channel,
  PlatformBreakdownPoint,
} from './types'

// Date range helpers
export function getDateRangeFromPreset(preset: DateRangePreset): DateRange {
  const today = startOfDay(new Date())

  switch (preset) {
    case 'last7':
      return { start: subDays(today, 6), end: endOfDay(today) }
    case 'last30':
      return { start: subDays(today, 29), end: endOfDay(today) }
    case 'last90':
      return { start: subDays(today, 89), end: endOfDay(today) }
    case 'custom':
      // Default to last 30 for custom until user sets dates
      return { start: subDays(today, 29), end: endOfDay(today) }
  }
}

export function getPreviousPeriod(dateRange: DateRange): DateRange {
  const days = differenceInDays(dateRange.end, dateRange.start) + 1
  return {
    start: subDays(dateRange.start, days),
    end: subDays(dateRange.start, 1),
  }
}

// Filter functions
export function filterByDateRange(
  metrics: DailyMetrics[],
  dateRange: DateRange
): DailyMetrics[] {
  return metrics.filter((m) => {
    const date = parseISO(m.date)
    return isWithinInterval(date, { start: dateRange.start, end: dateRange.end })
  })
}

export function filterProductSalesByDateRange(
  sales: ProductSale[],
  dateRange: DateRange
): ProductSale[] {
  return sales.filter((s) => {
    const date = parseISO(s.date)
    return isWithinInterval(date, { start: dateRange.start, end: dateRange.end })
  })
}

export function filterByLocations(
  metrics: DailyMetrics[],
  locationIds: string[]
): DailyMetrics[] {
  if (locationIds.length === 0) return metrics
  return metrics.filter((m) => locationIds.includes(m.locationId))
}

export function filterProductSalesByLocations(
  sales: ProductSale[],
  locationIds: string[]
): ProductSale[] {
  if (locationIds.length === 0) return sales
  return sales.filter((s) => locationIds.includes(s.locationId))
}

// Channel filtering affects totals calculation, not the raw data
export function getChannelOrders(
  metrics: DailyMetrics,
  channel: ChannelFilter
): number {
  if (channel === 'all') {
    return metrics.orders.pickup + metrics.orders.delivery + metrics.orders.catering
  }
  return metrics.orders[channel]
}

export function getChannelRevenue(
  metrics: DailyMetrics,
  channel: ChannelFilter
): number {
  if (channel === 'all') {
    return metrics.revenue.pickup + metrics.revenue.delivery + metrics.revenue.catering
  }
  return metrics.revenue[channel]
}

// Bucket by interval (aggregate daily data to weekly)
export function bucketByInterval(
  metrics: DailyMetrics[],
  interval: Interval
): Map<string, DailyMetrics[]> {
  const buckets = new Map<string, DailyMetrics[]>()

  for (const metric of metrics) {
    const date = parseISO(metric.date)
    let key: string

    if (interval === 'day') {
      key = metric.date
    } else {
      // Week - use start of week (Sunday)
      const weekStart = startOfWeek(date, { weekStartsOn: 0 })
      key = format(weekStart, 'yyyy-MM-dd')
    }

    if (!buckets.has(key)) {
      buckets.set(key, [])
    }
    buckets.get(key)!.push(metric)
  }

  return buckets
}

// Aggregate metrics for a bucket
function aggregateMetrics(
  metrics: DailyMetrics[],
  channel: ChannelFilter
): { orders: number; revenue: number; sessions: number; newOrders: number; returningOrders: number; loyaltyRedeems: number } {
  return metrics.reduce(
    (acc, m) => ({
      orders: acc.orders + getChannelOrders(m, channel),
      revenue: acc.revenue + getChannelRevenue(m, channel),
      sessions: acc.sessions + m.sessions,
      newOrders: acc.newOrders + m.customers.newOrders,
      returningOrders: acc.returningOrders + m.customers.returningOrders,
      loyaltyRedeems: acc.loyaltyRedeems + m.customers.loyaltyRedeems,
    }),
    { orders: 0, revenue: 0, sessions: 0, newOrders: 0, returningOrders: 0, loyaltyRedeems: 0 }
  )
}

// KPI computation
export function computeKpis(
  metrics: DailyMetrics[],
  channel: ChannelFilter
): KPIData {
  const agg = aggregateMetrics(metrics, channel)

  return {
    revenue: Math.round(agg.revenue * 100) / 100,
    orders: agg.orders,
    aov: agg.orders > 0 ? Math.round((agg.revenue / agg.orders) * 100) / 100 : 0,
    conversionRate:
      agg.sessions > 0
        ? Math.round((agg.orders / agg.sessions) * 10000) / 100
        : 0,
    sessions: agg.sessions,
  }
}

export function computeKpisWithChange(
  currentMetrics: DailyMetrics[],
  previousMetrics: DailyMetrics[],
  channel: ChannelFilter
): KPIWithChange {
  const current = computeKpis(currentMetrics, channel)
  const previous = computeKpis(previousMetrics, channel)

  const calcChange = (curr: number, prev: number): number => {
    if (prev === 0) return curr > 0 ? 100 : 0
    return Math.round(((curr - prev) / prev) * 10000) / 100
  }

  return {
    ...current,
    revenueChange: calcChange(current.revenue, previous.revenue),
    ordersChange: calcChange(current.orders, previous.orders),
    aovChange: calcChange(current.aov, previous.aov),
    conversionRateChange: calcChange(
      current.conversionRate,
      previous.conversionRate
    ),
  }
}

// Time series for charts
export function computeTimeSeries(
  currentMetrics: DailyMetrics[],
  previousMetrics: DailyMetrics[],
  interval: Interval,
  channel: ChannelFilter,
  showPrevious: boolean
): TimeSeriesPoint[] {
  const currentBuckets = bucketByInterval(currentMetrics, interval)
  const previousBuckets = showPrevious
    ? bucketByInterval(previousMetrics, interval)
    : new Map()

  // Sort bucket keys
  const sortedKeys = Array.from(currentBuckets.keys()).sort()
  const previousKeys = Array.from(previousBuckets.keys()).sort()

  return sortedKeys.map((key, index) => {
    const metrics = currentBuckets.get(key)!
    const agg = aggregateMetrics(metrics, channel)

    const point: TimeSeriesPoint = {
      date: key,
      revenue: Math.round(agg.revenue),
      orders: agg.orders,
    }

    if (showPrevious && previousKeys[index]) {
      const prevMetrics = previousBuckets.get(previousKeys[index])!
      const prevAgg = aggregateMetrics(prevMetrics, channel)
      point.previousRevenue = Math.round(prevAgg.revenue)
      point.previousOrders = prevAgg.orders
    }

    return point
  })
}

// Channel mix series
export function computeChannelMixSeries(
  metrics: DailyMetrics[],
  interval: Interval
): ChannelMixPoint[] {
  const buckets = bucketByInterval(metrics, interval)
  const sortedKeys = Array.from(buckets.keys()).sort()

  return sortedKeys.map((key) => {
    const dayMetrics = buckets.get(key)!
    const pickup = dayMetrics.reduce((sum, m) => sum + m.revenue.pickup, 0)
    const delivery = dayMetrics.reduce((sum, m) => sum + m.revenue.delivery, 0)
    const catering = dayMetrics.reduce((sum, m) => sum + m.revenue.catering, 0)

    return {
      date: key,
      pickup: Math.round(pickup),
      delivery: Math.round(delivery),
      catering: Math.round(catering),
      total: Math.round(pickup + delivery + catering),
    }
  })
}

// Location performance
export function computeLocationPerformance(
  data: SampleOverviewData,
  metrics: DailyMetrics[],
  channel: ChannelFilter
): LocationPerformance[] {
  const locationMap = new Map<
    string,
    { revenue: number; orders: number }
  >()

  for (const m of metrics) {
    const current = locationMap.get(m.locationId) || { revenue: 0, orders: 0 }
    locationMap.set(m.locationId, {
      revenue: current.revenue + getChannelRevenue(m, channel),
      orders: current.orders + getChannelOrders(m, channel),
    })
  }

  return data.locations.map((loc) => {
    const stats = locationMap.get(loc.id) || { revenue: 0, orders: 0 }
    return {
      locationId: loc.id,
      locationName: loc.name,
      revenue: Math.round(stats.revenue * 100) / 100,
      orders: stats.orders,
      aov:
        stats.orders > 0
          ? Math.round((stats.revenue / stats.orders) * 100) / 100
          : 0,
    }
  })
}

// Product performance
export function computeProductPerformance(
  sales: ProductSale[],
  sortBy: 'revenue' | 'units'
): ProductPerformance[] {
  const productMap = new Map<
    string,
    { name: string; category: string; revenue: number; units: number }
  >()

  for (const sale of sales) {
    const current = productMap.get(sale.productId) || {
      name: sale.productName,
      category: sale.category,
      revenue: 0,
      units: 0,
    }
    productMap.set(sale.productId, {
      ...current,
      revenue: current.revenue + sale.revenue,
      units: current.units + sale.units,
    })
  }

  const products: ProductPerformance[] = Array.from(productMap.entries()).map(
    ([productId, data]) => ({
      productId,
      productName: data.name,
      category: data.category,
      revenue: Math.round(data.revenue * 100) / 100,
      units: data.units,
    })
  )

  products.sort((a, b) =>
    sortBy === 'revenue' ? b.revenue - a.revenue : b.units - a.units
  )

  return products
}

// Customer breakdown
export function computeCustomerBreakdown(
  metrics: DailyMetrics[],
  interval: Interval
): CustomerBreakdownPoint[] {
  const buckets = bucketByInterval(metrics, interval)
  const sortedKeys = Array.from(buckets.keys()).sort()

  return sortedKeys.map((key) => {
    const dayMetrics = buckets.get(key)!
    const newOrders = dayMetrics.reduce(
      (sum, m) => sum + m.customers.newOrders,
      0
    )
    const returningOrders = dayMetrics.reduce(
      (sum, m) => sum + m.customers.returningOrders,
      0
    )
    const loyaltyRedeems = dayMetrics.reduce(
      (sum, m) => sum + m.customers.loyaltyRedeems,
      0
    )
    const total = newOrders + returningOrders

    return {
      date: key,
      newOrders,
      returningOrders,
      loyaltyRedeems,
      returningRate: total > 0 ? Math.round((returningOrders / total) * 100) : 0,
    }
  })
}

// Heatmap data
export function computeHeatmapData(metrics: DailyMetrics[]): HeatmapCell[] {
  // Aggregate by day of week and hour
  const grid: number[][] = Array.from({ length: 7 }, () =>
    Array(24).fill(0)
  )

  for (const m of metrics) {
    const date = parseISO(m.date)
    const dayOfWeek = getDay(date)

    for (let hour = 0; hour < 24; hour++) {
      grid[dayOfWeek][hour] += m.hourlyOrders[hour] || 0
    }
  }

  // Find max for normalization
  let maxOrders = 0
  for (const row of grid) {
    for (const val of row) {
      maxOrders = Math.max(maxOrders, val)
    }
  }

  // Create cells
  const cells: HeatmapCell[] = []
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      cells.push({
        dayOfWeek: day,
        hour,
        orders: grid[day][hour],
        intensity: maxOrders > 0 ? grid[day][hour] / maxOrders : 0,
      })
    }
  }

  return cells
}

// Platform breakdown series
export function computePlatformBreakdown(
  metrics: DailyMetrics[],
  interval: Interval
): PlatformBreakdownPoint[] {
  const buckets = bucketByInterval(metrics, interval)
  const sortedKeys = Array.from(buckets.keys()).sort()

  return sortedKeys.map((key) => {
    const dayMetrics = buckets.get(key)!

    return {
      date: key,
      webDesktop: dayMetrics.reduce((sum, m) => sum + m.platforms.webDesktop, 0),
      webTablet: dayMetrics.reduce((sum, m) => sum + m.platforms.webTablet, 0),
      webMobile: dayMetrics.reduce((sum, m) => sum + m.platforms.webMobile, 0),
      nativeIos: dayMetrics.reduce((sum, m) => sum + m.platforms.nativeIos, 0),
      nativeAndroid: dayMetrics.reduce((sum, m) => sum + m.platforms.nativeAndroid, 0),
    }
  })
}

// Channel totals for legend
export function computeChannelTotals(
  series: ChannelMixPoint[]
): { channel: Channel; total: number; share: number }[] {
  const totals = series.reduce(
    (acc, point) => ({
      pickup: acc.pickup + point.pickup,
      delivery: acc.delivery + point.delivery,
      catering: acc.catering + point.catering,
    }),
    { pickup: 0, delivery: 0, catering: 0 }
  )

  const grandTotal = totals.pickup + totals.delivery + totals.catering

  return [
    {
      channel: 'pickup' as Channel,
      total: totals.pickup,
      share: grandTotal > 0 ? Math.round((totals.pickup / grandTotal) * 100) : 0,
    },
    {
      channel: 'delivery' as Channel,
      total: totals.delivery,
      share:
        grandTotal > 0 ? Math.round((totals.delivery / grandTotal) * 100) : 0,
    },
    {
      channel: 'catering' as Channel,
      total: totals.catering,
      share:
        grandTotal > 0 ? Math.round((totals.catering / grandTotal) * 100) : 0,
    },
  ]
}

// Overall returning rate
export function computeOverallReturningRate(
  breakdown: CustomerBreakdownPoint[]
): number {
  const totals = breakdown.reduce(
    (acc, point) => ({
      newOrders: acc.newOrders + point.newOrders,
      returningOrders: acc.returningOrders + point.returningOrders,
    }),
    { newOrders: 0, returningOrders: 0 }
  )

  const total = totals.newOrders + totals.returningOrders
  return total > 0 ? Math.round((totals.returningOrders / total) * 100) : 0
}

// Format helpers
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function formatDate(dateStr: string, interval: Interval): string {
  const date = parseISO(dateStr)
  if (interval === 'week') {
    return format(date, 'MMM d')
  }
  return format(date, 'MMM d')
}

// Filter data using the complete filter state
export function applyFilters(
  data: SampleOverviewData,
  filters: FilterState
): {
  currentMetrics: DailyMetrics[]
  previousMetrics: DailyMetrics[]
  currentSales: ProductSale[]
} {
  const dateRange =
    filters.dateRangePreset === 'custom' && filters.customDateRange
      ? filters.customDateRange
      : getDateRangeFromPreset(filters.dateRangePreset)

  const previousRange = getPreviousPeriod(dateRange)

  // Filter by date range
  let currentMetrics = filterByDateRange(data.dailyMetrics, dateRange)
  let previousMetrics = filterByDateRange(data.dailyMetrics, previousRange)
  let currentSales = filterProductSalesByDateRange(data.productSales, dateRange)

  // Filter by locations
  currentMetrics = filterByLocations(currentMetrics, filters.locationIds)
  previousMetrics = filterByLocations(previousMetrics, filters.locationIds)
  currentSales = filterProductSalesByLocations(currentSales, filters.locationIds)

  return { currentMetrics, previousMetrics, currentSales }
}
