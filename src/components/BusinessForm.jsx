import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Wand2, Sparkles } from 'lucide-react'

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
  const [hint, setHint] = useState('Pro tip: be specific about services and audience to get sharper outputs.')

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
      setHint('Great! Scroll down to explore your plan and launch checklist.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const Input = (props) => (
    <input {...props} className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className||''}`} />
  )

  const Label = ({children}) => (
    <label className="text-xs font-medium text-gray-700">{children}</label>
  )

  const Field = ({label, children}) => (
    <div className="space-y-1">{label && <Label>{label}</Label>}{children}</div>
  )

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-red-700 border border-red-200">{error}</div>
      )}

      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100 p-3 text-xs text-gray-700 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-indigo-600" />{hint}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Business name">
          <Input name="business_name" value={form.business_name} onChange={handleChange} placeholder="Acme Wellness" required />
        </Field>
        <Field label="Industry">
          <Input name="industry" value={form.industry} onChange={handleChange} placeholder="Health & Wellness" required />
        </Field>
        <Field label="Services (comma separated)">
          <Input name="services" value={form.services} onChange={handleChange} placeholder="Massage, Nutrition coaching, Yoga" required />
        </Field>
        <Field label="Location">
          <Input name="location" value={form.location} onChange={handleChange} placeholder="Austin, TX" required />
        </Field>
        <Field label="Target audience">
          <Input name="target_audience" value={form.target_audience} onChange={handleChange} placeholder="Busy professionals 25-45" required />
        </Field>
        <Field label="Goals (comma separated)">
          <Input name="goals" value={form.goals} onChange={handleChange} placeholder="More bookings, Improve retention" />
        </Field>
        <Field label="Tone">
          <Input name="tone" value={form.tone} onChange={handleChange} placeholder="professional, friendly" />
        </Field>
        <Field label="Brand colors (hex, comma)">
          <Input name="brand_colors" value={form.brand_colors} onChange={handleChange} placeholder="#6d28d9,#0ea5e9" />
        </Field>
        <Field label="Brand voice (optional)">
          <Input name="brand_voice" value={form.brand_voice} onChange={handleChange} placeholder="Warm, expert, encouraging" />
        </Field>
        <Field label="FAQ questions (comma separated)">
          <Input name="faqs" value={form.faqs} onChange={handleChange} placeholder="Do you accept insurance?, What are your hours?" />
        </Field>
        <Field label="Customer interaction examples (comma)">
          <Input name="examples" value={form.examples} onChange={handleChange} placeholder="Ask about pricing, Book a session" />
        </Field>
        <Field label="Subscription tier">
          <select name="subscription_tier" value={form.subscription_tier} onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="starter">Starter</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </Field>
        <Field label="Website URL (optional)">
          <Input name="website_url" value={form.website_url} onChange={handleChange} placeholder="https://..." />
        </Field>
        <Field label="Contact name">
          <Input name="contact_name" value={form.contact_name} onChange={handleChange} placeholder="Jane Doe" />
        </Field>
        <Field label="Contact email">
          <Input name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="jane@acme.com" />
        </Field>
        <Field label="Contact phone">
          <Input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="(555) 555-5555" />
        </Field>
      </div>
      <motion.button whileHover={{scale: 1.01}} whileTap={{scale: 0.99}} type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 transition">
        {loading ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</>) : (<><Wand2 className="h-4 w-4 mr-2" />Generate My AI Business Assistant</>)}
      </motion.button>
    </form>
  )
}
