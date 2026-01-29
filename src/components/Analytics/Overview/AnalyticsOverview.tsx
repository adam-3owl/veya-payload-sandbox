'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { getSampleOverviewData } from './sampleData'
import {
  applyFilters,
  computeKpisWithChange,
  computeTimeSeries,
  computeChannelMixSeries,
  computeChannelTotals,
  computeLocationPerformance,
  computeProductPerformance,
  computeCustomerBreakdown,
  computeOverallReturningRate,
  computePlatformBreakdown,
  formatCurrency,
  formatNumber,
} from './analyticsUtils'
import type { FilterState } from './types'
import {
  KPICard,
  FilterBar,
  RevenueOrdersChart,
  ChannelMixChart,
  LocationLeaderboard,
  ProductMixChart,
  CustomerBreakdown,
  ChannelBreakdownChart,
  EmptyState,
} from './components'
import './AnalyticsOverview.scss'

const DEFAULT_FILTERS: FilterState = {
  dateRangePreset: 'last30',
  customDateRange: null,
  interval: 'day',
  locationIds: [],
  channel: 'all',
}

export const AnalyticsOverview: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [showPreviousPeriod, setShowPreviousPeriod] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load sample data once
  const sampleData = useMemo(() => getSampleOverviewData(42), [])

  // Simulate initial loading delay
  useEffect(() => {
    const delay = Math.random() * 400 + 400 // 400-800ms
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
  }, [])

  // Handle filter changes
  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }, [])

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  // Apply filters and compute derived data
  const { currentMetrics, previousMetrics, currentSales } = useMemo(
    () => applyFilters(sampleData, filters),
    [sampleData, filters]
  )

  // Check if we have data
  const hasData = currentMetrics.length > 0

  // KPIs
  const kpis = useMemo(
    () => computeKpisWithChange(currentMetrics, previousMetrics, filters.channel),
    [currentMetrics, previousMetrics, filters.channel]
  )

  // Time series for Revenue/Orders chart
  const timeSeries = useMemo(
    () =>
      computeTimeSeries(
        currentMetrics,
        previousMetrics,
        filters.interval,
        filters.channel,
        showPreviousPeriod
      ),
    [currentMetrics, previousMetrics, filters.interval, filters.channel, showPreviousPeriod]
  )

  // Channel mix series
  const channelMixSeries = useMemo(
    () => computeChannelMixSeries(currentMetrics, filters.interval),
    [currentMetrics, filters.interval]
  )

  const channelTotals = useMemo(
    () => computeChannelTotals(channelMixSeries),
    [channelMixSeries]
  )

  // Location performance
  const locationPerformance = useMemo(
    () => computeLocationPerformance(sampleData, currentMetrics, filters.channel),
    [sampleData, currentMetrics, filters.channel]
  )

  // Product performance
  const productPerformance = useMemo(
    () => computeProductPerformance(currentSales, 'revenue'),
    [currentSales]
  )

  // Customer breakdown
  const customerBreakdown = useMemo(
    () => computeCustomerBreakdown(currentMetrics, filters.interval),
    [currentMetrics, filters.interval]
  )

  const returningRate = useMemo(
    () => computeOverallReturningRate(customerBreakdown),
    [customerBreakdown]
  )

  // Platform breakdown
  const platformBreakdown = useMemo(
    () => computePlatformBreakdown(currentMetrics, filters.interval),
    [currentMetrics, filters.interval]
  )

  return (
    <div className="analytics-overview">
      <div className="analytics-overview__header">
        <h1 className="analytics-overview__title">Analytics Overview</h1>
        <p className="analytics-overview__subtitle">
          Monitor your business performance across all locations and channels
        </p>
      </div>

      <FilterBar
        filters={filters}
        locations={sampleData.locations}
        onFilterChange={handleFilterChange}
      />

      {!hasData && !loading ? (
        <EmptyState onReset={handleResetFilters} />
      ) : (
        <>
          {/* KPI Cards */}
          <div className="analytics-overview__kpis">
            <KPICard
              label="Revenue"
              value={formatCurrency(kpis.revenue)}
              change={kpis.revenueChange}
              loading={loading}
            />
            <KPICard
              label="Orders"
              value={formatNumber(kpis.orders)}
              change={kpis.ordersChange}
              loading={loading}
            />
            <KPICard
              label="Average Order Value"
              value={formatCurrency(kpis.aov)}
              change={kpis.aovChange}
              loading={loading}
            />
            <KPICard
              label="Conversion Rate"
              value={`${kpis.conversionRate.toFixed(1)}%`}
              change={kpis.conversionRateChange}
              loading={loading}
            />
          </div>

          {/* Charts Grid */}
          <div className="analytics-overview__charts">
            {/* Row 1: Revenue/Orders and Channel Mix */}
            <div className="analytics-overview__chart">
              <RevenueOrdersChart
                data={timeSeries}
                interval={filters.interval}
                showPrevious={showPreviousPeriod}
                onTogglePrevious={setShowPreviousPeriod}
                loading={loading}
              />
            </div>

            <div className="analytics-overview__chart">
              <ChannelMixChart
                data={channelMixSeries}
                channelTotals={channelTotals}
                interval={filters.interval}
                loading={loading}
              />
            </div>

            {/* Row 2: Location and Product */}
            <div className="analytics-overview__chart">
              <LocationLeaderboard data={locationPerformance} loading={loading} />
            </div>

            <div className="analytics-overview__chart">
              <ProductMixChart data={productPerformance} loading={loading} />
            </div>

            {/* Row 3: Customer and Channel Breakdown */}
            <div className="analytics-overview__chart">
              <CustomerBreakdown
                data={customerBreakdown}
                interval={filters.interval}
                returningRate={returningRate}
                loading={loading}
              />
            </div>

            <div className="analytics-overview__chart">
              <ChannelBreakdownChart
                data={platformBreakdown}
                interval={filters.interval}
                loading={loading}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnalyticsOverview
