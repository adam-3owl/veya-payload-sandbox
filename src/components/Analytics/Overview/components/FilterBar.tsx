'use client'

import React, { useCallback } from 'react'
import { format } from 'date-fns'
import type {
  FilterState,
  DateRangePreset,
  Interval,
  ChannelFilter,
  Location,
} from '../types'

interface FilterBarProps {
  filters: FilterState
  locations: Location[]
  onFilterChange: (filters: Partial<FilterState>) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  locations,
  onFilterChange,
}) => {
  const handleDatePresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const preset = e.target.value as DateRangePreset
      onFilterChange({ dateRangePreset: preset })
    },
    [onFilterChange]
  )

  const handleIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ interval: e.target.value as Interval })
    },
    [onFilterChange]
  )

  const handleChannelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ channel: e.target.value as ChannelFilter })
    },
    [onFilterChange]
  )

  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const options = e.target.options
      const selectedIds: string[] = []
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected && options[i].value !== '') {
          selectedIds.push(options[i].value)
        }
      }
      onFilterChange({ locationIds: selectedIds })
    },
    [onFilterChange]
  )

  const handleCustomDateChange = useCallback(
    (field: 'start' | 'end', value: string) => {
      if (!value) return

      const date = new Date(value)
      if (isNaN(date.getTime())) return

      const currentRange = filters.customDateRange || {
        start: new Date(),
        end: new Date(),
      }

      onFilterChange({
        dateRangePreset: 'custom',
        customDateRange: {
          ...currentRange,
          [field]: field === 'start' ? new Date(value + 'T00:00:00') : new Date(value + 'T23:59:59'),
        },
      })
    },
    [filters.customDateRange, onFilterChange]
  )

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <label className="filter-bar__label">Date Range</label>
        <select
          className="filter-bar__select"
          value={filters.dateRangePreset}
          onChange={handleDatePresetChange}
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last90">Last 90 Days</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {filters.dateRangePreset === 'custom' && (
        <div className="filter-bar__group filter-bar__group--custom-dates">
          <label className="filter-bar__label">From</label>
          <input
            type="date"
            className="filter-bar__input"
            value={
              filters.customDateRange
                ? format(filters.customDateRange.start, 'yyyy-MM-dd')
                : ''
            }
            onChange={(e) => handleCustomDateChange('start', e.target.value)}
          />
          <label className="filter-bar__label">To</label>
          <input
            type="date"
            className="filter-bar__input"
            value={
              filters.customDateRange
                ? format(filters.customDateRange.end, 'yyyy-MM-dd')
                : ''
            }
            onChange={(e) => handleCustomDateChange('end', e.target.value)}
          />
        </div>
      )}

      <div className="filter-bar__group">
        <label className="filter-bar__label">Interval</label>
        <select
          className="filter-bar__select"
          value={filters.interval}
          onChange={handleIntervalChange}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
        </select>
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label">Conveyance</label>
        <select
          className="filter-bar__select"
          value={filters.channel}
          onChange={handleChannelChange}
        >
          <option value="all">All Conveyances</option>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
          <option value="catering">Catering</option>
        </select>
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label">Locations</label>
        <select
          className="filter-bar__select filter-bar__select--multi"
          multiple
          value={filters.locationIds}
          onChange={handleLocationChange}
          size={1}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
