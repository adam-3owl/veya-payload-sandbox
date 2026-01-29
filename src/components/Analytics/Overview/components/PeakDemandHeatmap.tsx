'use client'

import React, { useMemo, useState } from 'react'
import { Card } from './Card'
import type { HeatmapCell } from '../types'
import { formatNumber } from '../analyticsUtils'

interface PeakDemandHeatmapProps {
  data: HeatmapCell[]
  loading?: boolean
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function formatHour(hour: number): string {
  if (hour === 0) return '12am'
  if (hour === 12) return '12pm'
  if (hour < 12) return `${hour}am`
  return `${hour - 12}pm`
}

export const PeakDemandHeatmap: React.FC<PeakDemandHeatmapProps> = ({
  data,
  loading = false,
}) => {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null)

  const cellMap = useMemo(() => {
    const map = new Map<string, HeatmapCell>()
    for (const cell of data) {
      map.set(`${cell.dayOfWeek}-${cell.hour}`, cell)
    }
    return map
  }, [data])

  const maxOrders = useMemo(() => {
    return Math.max(...data.map((c) => c.orders), 1)
  }, [data])

  const getIntensityColor = (intensity: number): string => {
    // Use a blue gradient
    if (intensity === 0) return 'var(--theme-elevation-50, #f9fafb)'
    if (intensity < 0.2) return 'rgba(59, 130, 246, 0.15)'
    if (intensity < 0.4) return 'rgba(59, 130, 246, 0.3)'
    if (intensity < 0.6) return 'rgba(59, 130, 246, 0.5)'
    if (intensity < 0.8) return 'rgba(59, 130, 246, 0.7)'
    return 'rgba(59, 130, 246, 0.9)'
  }

  if (loading) {
    return (
      <Card title="Peak Demand" subtitle="Orders by day and hour">
        <div className="chart-skeleton chart-skeleton--heatmap" />
      </Card>
    )
  }

  return (
    <Card title="Peak Demand" subtitle="Orders by day and hour">
      <div className="heatmap">
        <div className="heatmap__grid">
          {/* Header row with hours */}
          <div className="heatmap__corner" />
          {HOURS.filter((h) => h % 2 === 0).map((hour) => (
            <div key={`hour-${hour}`} className="heatmap__hour-label">
              {formatHour(hour)}
            </div>
          ))}

          {/* Data rows */}
          {DAYS.map((day, dayIndex) => (
            <React.Fragment key={day}>
              <div className="heatmap__day-label">{day}</div>
              {HOURS.map((hour) => {
                const cell = cellMap.get(`${dayIndex}-${hour}`)
                const orders = cell?.orders || 0
                const intensity = cell?.intensity || 0

                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="heatmap__cell"
                    style={{ backgroundColor: getIntensityColor(intensity) }}
                    onMouseEnter={() => setHoveredCell(cell || null)}
                    onMouseLeave={() => setHoveredCell(null)}
                    title={`${day} ${formatHour(hour)}: ${formatNumber(orders)} orders`}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div className="heatmap__tooltip-fixed">
            <span className="heatmap__tooltip-day">
              {DAYS[hoveredCell.dayOfWeek]} {formatHour(hoveredCell.hour)}
            </span>
            <span className="heatmap__tooltip-orders">
              {formatNumber(hoveredCell.orders)} orders
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="heatmap__legend">
          <span className="heatmap__legend-label">Less</span>
          <div className="heatmap__legend-scale">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
              <div
                key={intensity}
                className="heatmap__legend-cell"
                style={{ backgroundColor: getIntensityColor(intensity) }}
              />
            ))}
          </div>
          <span className="heatmap__legend-label">More</span>
        </div>
      </div>
    </Card>
  )
}
