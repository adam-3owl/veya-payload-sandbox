'use client'

import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { Card } from './Card'
import type { TimeSeriesPoint, Interval } from '../types'
import { formatCurrency, formatNumber } from '../analyticsUtils'

interface RevenueOrdersChartProps {
  data: TimeSeriesPoint[]
  interval: Interval
  showPrevious: boolean
  onTogglePrevious: (show: boolean) => void
  loading?: boolean
}

export const RevenueOrdersChart: React.FC<RevenueOrdersChartProps> = ({
  data,
  interval,
  showPrevious,
  onTogglePrevious,
  loading = false,
}) => {
  const formatXAxis = (dateStr: string) => {
    try {
      const date = parseISO(dateStr)
      return interval === 'week' ? format(date, 'MMM d') : format(date, 'M/d')
    } catch {
      return dateStr
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null

    const date = parseISO(label)
    const formattedDate = format(date, 'MMM d, yyyy')

    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__date">{formattedDate}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="chart-tooltip__item" style={{ color: entry.color }}>
            <span className="chart-tooltip__label">{entry.name}:</span>
            <span className="chart-tooltip__value">
              {entry.name.includes('Revenue')
                ? formatCurrency(entry.value)
                : formatNumber(entry.value)}
            </span>
          </p>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Revenue & Orders" subtitle="Over time">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card
      title="Revenue & Orders"
      subtitle="Performance over time"
      actions={
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showPrevious}
            onChange={(e) => onTogglePrevious(e.target.checked)}
          />
          <span>Show previous period</span>
        </label>
      }
    >
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-elevation-150, #e5e7eb)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              yAxisId="revenue"
              orientation="left"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="orders"
              orientation="right"
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            {showPrevious && (
              <>
                <Line
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="previousRevenue"
                  name="Prev Revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  opacity={0.5}
                />
                <Line
                  yAxisId="orders"
                  type="monotone"
                  dataKey="previousOrders"
                  name="Prev Orders"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  opacity={0.5}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
