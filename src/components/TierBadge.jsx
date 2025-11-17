import React from 'react'

export default function TierBadge({ tier }){
  const map = {
    starter: {
      label: 'Starter',
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      ring: 'ring-amber-300'
    },
    standard: {
      label: 'Standard',
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      ring: 'ring-indigo-300'
    },
    premium: {
      label: 'Premium',
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      ring: 'ring-emerald-300'
    },
  }
  const t = map[tier] || map.starter
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${t.bg} ${t.text} ring-1 ${t.ring}`}>
      {t.label}
    </span>
  )
}
