import React from 'react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-amber-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 via-sky-500 to-amber-400" />
            <span className="font-semibold text-gray-900">Flames AI Hub</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
            <a href="#form" className="hover:text-gray-900">Generator</a>
            <a href="#results" className="hover:text-gray-900">Results</a>
          </nav>
        </div>
      </header>
      <main className="relative">{children}</main>
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-600">
          Built with love by Flames • AI Business Assistant Generator
        </div>
      </footer>
    </div>
  )
}
