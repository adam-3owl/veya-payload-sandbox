'use client'

import React from 'react'
import {
  ComposedChart,
  Bar,
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
import type { CustomerBreakdownPoint, Interval } from '../types'
import { formatNumber } from '../analyticsUtils'

interface CustomerBreakdownProps {
  data: CustomerBreakdownPoint[]
  interval: Interval
  returningRate: number
  loading?: boolean
}

export const CustomerBreakdown: React.FC<CustomerBreakdownProps> = ({
  data,
  interval,
  returningRate,
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
    const dataPoint = payload[0]?.payload as CustomerBreakdownPoint

    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__date">{formattedDate}</p>
        <p className="chart-tooltip__item" style={{ color: '#10b981' }}>
          <span className="chart-tooltip__label">Returning:</span>
          <span className="chart-tooltip__value">
            {formatNumber(dataPoint?.returningOrders || 0)}
          </span>
        </p>
        <p className="chart-tooltip__item" style={{ color: '#3b82f6' }}>
          <span className="chart-tooltip__label">New:</span>
          <span className="chart-tooltip__value">
            {formatNumber(dataPoint?.newOrders || 0)}
          </span>
        </p>
        <p className="chart-tooltip__item" style={{ color: '#f59e0b' }}>
          <span className="chart-tooltip__label">Loyalty Redeems:</span>
          <span className="chart-tooltip__value">
            {formatNumber(dataPoint?.loyaltyRedeems || 0)}
          </span>
        </p>
        <p className="chart-tooltip__item chart-tooltip__item--muted">
          <span className="chart-tooltip__label">Returning Rate:</span>
          <span className="chart-tooltip__value">{dataPoint?.returningRate || 0}%</span>
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Customer Breakdown" subtitle="New vs returning customers">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card
      title="Customer Breakdown"
      subtitle="New vs returning customers"
      actions={
        <div className="returning-rate-badge">
          <span className="returning-rate-badge__label">Returning Rate:</span>
          <span className="returning-rate-badge__value">{returningRate}%</span>
        </div>
      }
    >
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-elevation-150, #e5e7eb)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              yAxisId="orders"
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="loyalty"
              orientation="right"
              stroke="var(--theme-elevation-500, #6b7280)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="orders"
              dataKey="returningOrders"
              name="Returning"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              yAxisId="orders"
              dataKey="newOrders"
              name="New"
              stackId="a"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="loyalty"
              type="monotone"
              dataKey="loyaltyRedeems"
              name="Loyalty Redeems"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
