import React from 'react'
import { Download, Clipboard } from 'lucide-react'

export default function ExportBar({ data, fileBase = 'ai-business-assistant' }){
  if (!data) return null

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileBase}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const toCSV = () => {
    const rows = []
    // basic summary rows
    rows.push(['Business', data.business_summary || ''])
    rows.push(['Tier', data.subscription_tier || ''])
    // SEO keywords
    rows.push([])
    rows.push(['SEO Keywords'])
    ;(data.seo_keywords||[]).forEach(k => rows.push([k]))
    // Marketing cadence
    rows.push([])
    rows.push(['Marketing Cadence'])
    Object.entries(data.marketing_plan?.cadence || {}).forEach(([k,v]) => rows.push([k, v]))
    // Convert to CSV
    return rows.map(r => r.map(cell => {
      const s = String(cell ?? '')
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"'
      }
      return s
    }).join(',')).join('\n')
  }

  const downloadCSV = () => {
    const csv = toCSV()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileBase}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      alert('Copied to clipboard')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={downloadJSON} className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">
        <Download className="h-4 w-4 mr-1" /> Download JSON
      </button>
      <button onClick={downloadCSV} className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">
        <Download className="h-4 w-4 mr-1" /> Download CSV
      </button>
      <button onClick={copyToClipboard} className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">
        <Clipboard className="h-4 w-4 mr-1" /> Copy JSON
      </button>
    </div>
  )
}
