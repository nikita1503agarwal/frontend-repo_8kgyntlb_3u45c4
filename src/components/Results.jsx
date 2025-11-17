import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Bot, Globe, Share2, CalendarClock, Megaphone, ListChecks, Workflow, LayoutGrid } from 'lucide-react'
import TierBadge from './TierBadge'
import ActivityBoard from './ActivityBoard'

function Card({ title, icon: Icon, children }){
  return (
    <motion.div initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3}} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-gray-900">
        {Icon && <Icon className="h-5 w-5 text-indigo-600" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </motion.div>
  )
}

export default function Results({ data }) {
  if (!data) return null
  const tier = data.subscription_tier

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Your AI Business Assistant</h2>
          <p className="text-gray-600 text-sm">Everything below is generated from your answers.</p>
        </div>
        <TierBadge tier={tier} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Business Summary" icon={LayoutGrid}>
          <p>{data.business_summary}</p>
        </Card>

        <Card title="Brand Identity" icon={Palette}>
          <div className="flex items-start gap-4">
            <div className="flex -space-x-2">
              {(data.brand_identity?.colors || []).slice(0,4).map((c,i)=> (
                <div key={i} className="h-7 w-7 rounded-full ring-2 ring-white border" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-medium">Voice</div>
              <div className="text-gray-700">{data.brand_identity?.voice}</div>
              <div className="mt-1 text-gray-500 text-xs">Keywords: {(data.brand_identity?.keywords||[]).join(', ')}</div>
            </div>
          </div>
        </Card>

        <Card title="AI Chatbot Persona" icon={Bot}>
          <div className="space-y-2">
            <div>
              <div className="font-medium">System Prompt</div>
              <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded border border-gray-200">{data.chatbot_persona?.system_prompt}</pre>
            </div>
            <div>
              <div className="font-medium">Lead Form Fields</div>
              <div className="text-sm text-gray-700">{(data.chatbot_persona?.outputs?.lead_form_fields||[]).join(', ')}</div>
            </div>
          </div>
        </Card>

        <Card title="Website Structure" icon={Globe}>
          <ul className="list-disc pl-5">
            {(data.website_structure?.pages||[]).map((p,i)=> (
              <li key={i}>{p.title} {p.items ? `– ${p.items.join(', ')}` : ''}</li>
            ))}
          </ul>
          {data.website_structure?.integrations && (
            <div className="mt-2 text-xs text-gray-600">Integrations: {Object.keys(data.website_structure.integrations).join(', ')}</div>
          )}
        </Card>

        <Card title="Social Media Plan" icon={Share2}>
          <div className="text-sm">Style: {data.social_media_plan?.captions_style}</div>
          <div className="text-xs text-gray-600">Platforms: {(data.social_media_plan?.platforms||[]).join(', ')}</div>
          <div className="mt-2 max-h-40 overflow-auto border rounded">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left p-2">Day</th>
                  <th className="text-left p-2">Theme</th>
                </tr>
              </thead>
              <tbody>
                {(data.social_media_plan?.calendar_30_day||[]).slice(0,10).map((r,i)=> (
                  <tr key={i} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2">{r.day}</td>
                    <td className="p-2">{r.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Booking / Appointments" icon={CalendarClock}>
          <div className="text-sm">Booking link: <a className="text-indigo-600 underline" href={data.booking_tools?.booking_link} target="_blank">{data.booking_tools?.booking_link}</a></div>
          <div className="text-xs text-gray-600">Reminders: {(data.booking_tools?.reminders||[]).join(', ')}</div>
        </Card>

        <Card title="Sales Funnels & Ad Ideas" icon={Megaphone}>
          <div className="space-y-2">
            <div>
              <div className="font-medium">Funnels</div>
              <ul className="list-disc pl-5">
                {(data.sales_and_ads?.funnels||[]).map((f,i)=>(<li key={i}>{f.name}</li>))}
              </ul>
            </div>
            <div>
              <div className="font-medium">Ad Ideas</div>
              <ul className="list-disc pl-5">
                {(data.sales_and_ads?.ad_ideas||[]).map((a,i)=>(<li key={i}>{a.platform}: {a.headline}</li>))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="SOPs" icon={ListChecks}>
          <ul className="list-disc pl-5">
            {(data.sops||[]).map((s,i)=>(<li key={i}>{s}</li>))}
          </ul>
        </Card>

        <Card title="Automations" icon={Workflow}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="font-medium">Triggers</div>
              <ul className="list-disc pl-5 text-sm">
                {(data.automations?.triggers||[]).map((t,i)=>(<li key={i}>{t}</li>))}
              </ul>
            </div>
            <div>
              <div className="font-medium">Actions</div>
              <ul className="list-disc pl-5 text-sm">
                {(data.automations?.actions||[]).map((t,i)=>(<li key={i}>{t}</li>))}
              </ul>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">Integrations: {(data.automations?.integrations||[]).join(', ')}</div>
        </Card>

        <Card title="Dashboard" icon={LayoutGrid}>
          <div className="text-sm">Analytics: {data.dashboard?.analytics?.level}</div>
          <div className="text-xs text-gray-600">Roles:</div>
          <ul className="list-disc pl-5">
            {(data.dashboard?.roles||[]).slice(0,6).map((r,i)=>(<li key={i}>{r.name} – {r.status}</li>))}
          </ul>
        </Card>
      </div>

      <ActivityBoard data={data} />
    </div>
  )
}
