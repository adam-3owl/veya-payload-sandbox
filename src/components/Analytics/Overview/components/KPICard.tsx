'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string
  change?: number
  loading?: boolean
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  loading = false,
}) => {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus size={14} />
    }
    return change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />
  }

  const getChangeClass = () => {
    if (change === undefined || change === 0) return 'neutral'
    return change > 0 ? 'positive' : 'negative'
  }

  if (loading) {
    return (
      <div className="kpi-card kpi-card--loading">
        <div className="kpi-card__label skeleton" />
        <div className="kpi-card__value skeleton" />
        <div className="kpi-card__change skeleton" />
      </div>
    )
  }

  return (
    <div className="kpi-card">
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__value">{value}</div>
      {change !== undefined && (
        <div className={`kpi-card__change kpi-card__change--${getChangeClass()}`}>
          {getTrendIcon()}
          <span>
            {change >= 0 ? '+' : ''}
            {change.toFixed(1)}% vs prev period
          </span>
        </div>
      )}
    </div>
  )
}
