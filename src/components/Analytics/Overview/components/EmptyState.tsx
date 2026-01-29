'use client'

import React from 'react'
import { FileQuestion } from 'lucide-react'

interface EmptyStateProps {
  onReset: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="empty-state">
      <FileQuestion size={48} className="empty-state__icon" />
      <h3 className="empty-state__title">No data for selected filters</h3>
      <p className="empty-state__description">
        Try adjusting your date range, locations, or channel filters to see data.
      </p>
      <button className="empty-state__btn" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  )
}
