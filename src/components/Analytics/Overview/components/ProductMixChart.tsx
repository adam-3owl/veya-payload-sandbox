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
import type { ProductPerformance } from '../types'
import { formatCurrency, formatNumber } from '../analyticsUtils'
import { PRODUCT_CATEGORIES, type ProductCategory } from '../sampleData'

interface ProductMixChartProps {
  data: ProductPerformance[]
  loading?: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  Bowls: '#3b82f6',
  Salads: '#10b981',
  Drinks: '#f59e0b',
  Sides: '#8b5cf6',
  Desserts: '#ec4899',
}

export const ProductMixChart: React.FC<ProductMixChartProps> = ({
  data,
  loading = false,
}) => {
  const [sortBy, setSortBy] = useState<'revenue' | 'units'>('revenue')
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all')

  const chartData = useMemo(() => {
    let filtered = data
    if (categoryFilter !== 'all') {
      filtered = data.filter((p) => p.category === categoryFilter)
    }

    const sorted = [...filtered].sort((a, b) =>
      sortBy === 'revenue' ? b.revenue - a.revenue : b.units - a.units
    )

    return sorted.slice(0, 10).map((prod) => ({
      ...prod,
      shortName:
        prod.productName.length > 18
          ? prod.productName.substring(0, 18) + '...'
          : prod.productName,
    }))
  }, [data, sortBy, categoryFilter])

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null

    const prod = payload[0].payload as ProductPerformance
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__date">{prod.productName}</p>
        <p className="chart-tooltip__item chart-tooltip__item--muted">
          {prod.category}
        </p>
        <p className="chart-tooltip__item">
          <span className="chart-tooltip__label">Revenue:</span>
          <span className="chart-tooltip__value">{formatCurrency(prod.revenue)}</span>
        </p>
        <p className="chart-tooltip__item">
          <span className="chart-tooltip__label">Units:</span>
          <span className="chart-tooltip__value">{formatNumber(prod.units)}</span>
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <Card title="Product Mix" subtitle="Top products by performance">
        <div className="chart-skeleton" />
      </Card>
    )
  }

  return (
    <Card
      title="Product Mix"
      subtitle="Top 10 products"
      actions={
        <div className="product-mix-actions">
          <select
            className="filter-bar__select filter-bar__select--sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | 'all')}
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${sortBy === 'revenue' ? 'toggle-btn--active' : ''}`}
              onClick={() => setSortBy('revenue')}
            >
              Revenue
            </button>
            <button
              className={`toggle-btn ${sortBy === 'units' ? 'toggle-btn--active' : ''}`}
              onClick={() => setSortBy('units')}
            >
              Units
            </button>
          </div>
        </div>
      }
    >
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 120, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--theme-elevation-150, #e5e7eb)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tickFormatter={(v) =>
                sortBy === 'revenue' ? `$${(v / 1000).toFixed(1)}k` : formatNumber(v)
              }
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
              width={115}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--theme-elevation-50, #f9fafb)' }} />
            <Bar dataKey={sortBy} radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.productId}
                  fill={CATEGORY_COLORS[entry.category] || '#6b7280'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="category-legend">
        {PRODUCT_CATEGORIES.map((cat) => (
          <div key={cat} className="category-legend__item">
            <span
              className="category-legend__color"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <span className="category-legend__label">{cat}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
