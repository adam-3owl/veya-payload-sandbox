'use client'

import React, { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card } from './Card'
import type { LocationPerformance } from '../types'
import { formatCurrency, formatNumber } from '../analyticsUtils'

interface LocationLeaderboardProps {
  data: LocationPerformance[]
  loading?: boolean
}

export const LocationLeaderboard: React.FC<LocationLeaderboardProps> = ({
  data,
  loading = false,
}) => {
  const [showTop, setShowTop] = useState(true)

  const chartData = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.revenue - a.revenue)
    const sliced = showTop ? sorted.slice(0, 10) : sorted.slice(-10).reverse()
    return sliced.map((loc) => ({
      ...loc,
      shortName: loc.locationName.length > 15
        ? loc.locationName.substring(0, 15) + '...'
        : loc.locationName,
    }))
  }, [data, showTop])

  const maxRevenue = useMemo(() => {
    return Math.max(...chartData.map((d) => d.revenue))
  }, [chartData])

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null

    const loc = payload[0].payload as LocationPerformance
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__date">{loc.locationName}</p>
        <p className="chart-tooltip__item">
          <span className="chart-tooltip__label">Revenue:</span>
          <span className="chart-tooltip__value">{formatCurrency(loc.revenue)}</span>
        </p>
        <p className="chart-tooltip__item">
          <span className="chart-tooltip__label">Orders:</span>
          <span className="chart-tooltip__value">{formatNumber(loc.orders)}</span>
        </p>
        <p className="chart-tooltip__item">
          <span className="chart-tooltip__label">AOV:</span>
          <span className="chart-tooltip__value">{formatCurrency(loc.aov)}</span>
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Location Performance" subtitle="Ranked by revenue">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card
      title="Location Performance"
      subtitle="Ranked by revenue"
      actions={
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${showTop ? 'toggle-btn--active' : ''}`}
            onClick={() => setShowTop(true)}
          >
            Top 10
          </button>
          <button
            className={`toggle-btn ${!showTop ? 'toggle-btn--active' : ''}`}
            onClick={() => setShowTop(false)}
          >
            Bottom 10
          </button>
        </div>
      }
    >
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--theme-elevation-150, #e5e7eb)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="shortName"
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={95}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--theme-elevation-50, #f9fafb)' }} />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.locationId}
                  fill={showTop ? '#3b82f6' : '#ef4444'}
                  fillOpacity={1 - index * 0.07}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="location-table">
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Revenue</th>
              <th>Orders</th>
              <th>AOV</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((loc) => (
              <tr key={loc.locationId}>
                <td>{loc.locationName}</td>
                <td>{formatCurrency(loc.revenue)}</td>
                <td>{formatNumber(loc.orders)}</td>
                <td>{formatCurrency(loc.aov)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
