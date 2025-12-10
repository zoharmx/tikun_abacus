'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Database, Plus, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Demo Cases', href: '/demo-cases', icon: Database },
  { name: 'New Analysis', href: '/new-analysis', icon: Plus },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-r border-purple-800/30 shadow-2xl">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-purple-800/30 bg-black/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-white font-bold text-xl">ת</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">Tikun Olam</h1>
            <p className="text-purple-300 text-xs">Ethical Framework</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation?.map?.((item) => {
          const Icon = item?.icon
          const isActive = pathname === item?.href
          
          return (
            <Link
              key={item?.name ?? 'nav-item'}
              href={item?.href ?? '/'}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                  : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
              )}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{item?.name}</span>
            </Link>
          )
        }) ?? null}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-800/30 bg-black/20">
        <div className="text-xs text-purple-300 space-y-2">
          <p className="font-semibold">10 Sefirot System</p>
          <p className="text-purple-400 leading-relaxed">
            Ethical computational analysis based on Kabbalah
          </p>
        </div>
      </div>
    </div>
  )
}
