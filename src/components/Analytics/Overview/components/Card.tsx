'use client'

import React from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`analytics-card ${className}`}>
      {(title || actions) && (
        <div className="analytics-card__header">
          <div className="analytics-card__header-text">
            {title && <h3 className="analytics-card__title">{title}</h3>}
            {subtitle && (
              <p className="analytics-card__subtitle">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="analytics-card__actions">{actions}</div>
          )}
        </div>
      )}
      <div className="analytics-card__content">{children}</div>
    </div>
  )
}
