import React from 'react'

export default function Results({ data }) {
  if (!data) return null
  const Section = ({ title, children }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="prose max-w-none text-sm text-gray-700">
        {children}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section title="Business Summary">
        <p>{data.business_summary}</p>
      </Section>

      <Section title="Brand Identity">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.brand_identity, null, 2)}</pre>
      </Section>

      <Section title="AI Chatbot Personality & Prompt">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.chatbot_persona, null, 2)}</pre>
      </Section>

      <Section title="Website Structure">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.website_structure, null, 2)}</pre>
      </Section>

      <Section title="Social Media Plan">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.social_media_plan, null, 2)}</pre>
      </Section>

      <Section title="Booking/Appointment Tools">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.booking_tools, null, 2)}</pre>
      </Section>

      <Section title="Sales Funnels + Ad Ideas">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.sales_and_ads, null, 2)}</pre>
      </Section>

      <Section title="SOPs">
        <ul className="list-disc pl-5">
          {data.sops.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </Section>

      <Section title="Automations Setup">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.automations, null, 2)}</pre>
      </Section>

      <Section title="Dashboard Overview">
        <pre className="whitespace-pre-wrap">{JSON.stringify(data.dashboard, null, 2)}</pre>
      </Section>
    </div>
  )
}
