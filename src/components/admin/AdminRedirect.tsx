'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AdminRedirectProps {
  to: string
  message?: string
}

export function AdminRedirect({ to, message }: AdminRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: '#6b7280',
      fontSize: '14px',
    }}>
      {message || `Redirecting...`}
    </div>
  )
}

export default AdminRedirect
