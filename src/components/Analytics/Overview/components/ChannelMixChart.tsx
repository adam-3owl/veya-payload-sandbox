'use client'

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { Card } from './Card'
import type { ChannelMixPoint, Interval, Channel } from '../types'
import { formatCurrency } from '../analyticsUtils'

interface ChannelMixChartProps {
  data: ChannelMixPoint[]
  channelTotals: { channel: Channel; total: number; share: number }[]
  interval: Interval
  loading?: boolean
}

const CHANNEL_COLORS = {
  pickup: '#3b82f6',
  delivery: '#10b981',
  catering: '#f59e0b',
}

const CHANNEL_LABELS = {
  pickup: 'Pickup',
  delivery: 'Delivery',
  catering: 'Catering',
}

export const ChannelMixChart: React.FC<ChannelMixChartProps> = ({
  data,
  channelTotals,
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
          <span className="chart-tooltip__label">Total:</span>
          <span className="chart-tooltip__value">{formatCurrency(total)}</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="chart-tooltip__item" style={{ color: entry.color }}>
            <span className="chart-tooltip__label">{entry.name}:</span>
            <span className="chart-tooltip__value">{formatCurrency(entry.value)}</span>
          </p>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Conveyance Breakdown" subtitle="Revenue by conveyance over time">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card title="Conveyance Breakdown" subtitle="Revenue by conveyance over time">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-elevation-150, #e5e7eb)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pickup"
              name="Pickup"
              stackId="1"
              stroke={CHANNEL_COLORS.pickup}
              fill={CHANNEL_COLORS.pickup}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="delivery"
              name="Delivery"
              stackId="1"
              stroke={CHANNEL_COLORS.delivery}
              fill={CHANNEL_COLORS.delivery}
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="catering"
              name="Catering"
              stackId="1"
              stroke={CHANNEL_COLORS.catering}
              fill={CHANNEL_COLORS.catering}
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="channel-legend">
        {channelTotals.map(({ channel, total, share }) => (
          <div key={channel} className="channel-legend__item">
            <span
              className="channel-legend__color"
              style={{ backgroundColor: CHANNEL_COLORS[channel] }}
            />
            <span className="channel-legend__label">{CHANNEL_LABELS[channel]}</span>
            <span className="channel-legend__value">{formatCurrency(total)}</span>
            <span className="channel-legend__share">{share}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
