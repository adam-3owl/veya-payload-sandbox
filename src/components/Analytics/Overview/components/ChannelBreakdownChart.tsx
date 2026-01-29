'use client'

import React from 'react'
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
import type { PlatformBreakdownPoint, Interval } from '../types'
import { formatNumber } from '../analyticsUtils'

interface ChannelBreakdownChartProps {
  data: PlatformBreakdownPoint[]
  interval: Interval
  loading?: boolean
}

const PLATFORM_CONFIG = {
  webDesktop: { label: 'Web Desktop', color: '#3b82f6' },
  webTablet: { label: 'Web Tablet', color: '#8b5cf6' },
  webMobile: { label: 'Web Mobile', color: '#06b6d4' },
  nativeIos: { label: 'Native iOS', color: '#10b981' },
  nativeAndroid: { label: 'Native Android', color: '#f59e0b' },
}

export const ChannelBreakdownChart: React.FC<ChannelBreakdownChartProps> = ({
  data,
  interval,
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
    const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0)

    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__date">{formattedDate}</p>
        <p className="chart-tooltip__item chart-tooltip__item--total">
          <span className="chart-tooltip__label">Total Orders:</span>
          <span className="chart-tooltip__value">{formatNumber(total)}</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="chart-tooltip__item" style={{ color: entry.color }}>
            <span className="chart-tooltip__label">{entry.name}:</span>
            <span className="chart-tooltip__value">{formatNumber(entry.value)}</span>
          </p>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Device Breakdown" subtitle="Orders by platform">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card title="Device Breakdown" subtitle="Orders by platform over time">
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
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={config.label}
                stroke={config.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
