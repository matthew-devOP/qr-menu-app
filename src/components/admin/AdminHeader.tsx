'use client'

import { User } from 'lucide-react'

interface AdminHeaderProps {
  user: {
    name: string
    email: string
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-4 lg:px-8">
      <div>
        <h2 className="text-lg font-semibold text-brand-primary">
          Panou Administrare
        </h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-brand-primary">{user.name}</p>
          <p className="text-xs text-text-muted">{user.email}</p>
        </div>
        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </div>
    </header>
  )
}
