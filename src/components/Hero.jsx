import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 sm:pt-24 sm:pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-indigo-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              AI Business Assistant Generator
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Build a full digital workforce from one form
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Generate a brand-trained assistant, automations, website structure, social plan, booking tools and dashboards—instantly.
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white" />
    </section>
  )
}
