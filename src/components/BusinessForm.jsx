import React, { useState } from 'react'

const defaultState = {
  business_name: '',
  industry: '',
  services: '',
  location: '',
  target_audience: '',
  goals: '',
  tone: 'professional',
  brand_colors: '#6d28d9,#0ea5e9',
  brand_voice: '',
  faqs: '',
  examples: '',
  subscription_tier: 'starter',
  website_url: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
}

export default function BusinessForm({ onGenerated }) {
  const [form, setForm] = useState(defaultState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const parseList = (val) => val.split(',').map((s) => s.trim()).filter(Boolean)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      business_name: form.business_name,
      industry: form.industry,
      services: parseList(form.services),
      location: form.location,
      target_audience: form.target_audience,
      goals: parseList(form.goals),
      tone: form.tone,
      brand_colors: parseList(form.brand_colors),
      brand_voice: form.brand_voice || null,
      faqs: parseList(form.faqs).map((q) => ({ question: q, answer: '' })),
      examples: parseList(form.examples),
      subscription_tier: form.subscription_tier,
      website_url: form.website_url || null,
      contact: {
        name: form.contact_name || null,
        email: form.contact_email || null,
        phone: form.contact_phone || null,
      },
    }

    try {
      const res = await fetch(`${backend}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to generate. Please check inputs.')
      const data = await res.json()
      onGenerated?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-red-700 border border-red-200">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="business_name" value={form.business_name} onChange={handleChange} placeholder="Business name" className="input" required />
        <input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" className="input" required />
        <input name="services" value={form.services} onChange={handleChange} placeholder="Services (comma separated)" className="input" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input" required />
        <input name="target_audience" value={form.target_audience} onChange={handleChange} placeholder="Target audience" className="input" required />
        <input name="goals" value={form.goals} onChange={handleChange} placeholder="Goals (comma separated)" className="input" />
        <input name="tone" value={form.tone} onChange={handleChange} placeholder="Tone (e.g., professional, friendly)" className="input" />
        <input name="brand_colors" value={form.brand_colors} onChange={handleChange} placeholder="Brand colors (hex, comma)" className="input" />
        <input name="brand_voice" value={form.brand_voice} onChange={handleChange} placeholder="Brand voice (optional)" className="input" />
        <input name="faqs" value={form.faqs} onChange={handleChange} placeholder="FAQ questions (comma separated)" className="input" />
        <input name="examples" value={form.examples} onChange={handleChange} placeholder="Customer interaction examples (comma)" className="input" />
        <select name="subscription_tier" value={form.subscription_tier} onChange={handleChange} className="input">
          <option value="starter">Starter</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <input name="website_url" value={form.website_url} onChange={handleChange} placeholder="Website URL (optional)" className="input" />
        <input name="contact_name" value={form.contact_name} onChange={handleChange} placeholder="Contact name" className="input" />
        <input name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="Contact email" className="input" />
        <input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="Contact phone" className="input" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Generating…' : 'Generate My AI Business Assistant'}
      </button>
      <style>{`
        .input{ @apply w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500; }
        .btn-primary{ @apply inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 transition; }
      `}</style>
    </form>
  )
}
