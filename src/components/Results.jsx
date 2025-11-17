import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Bot, Globe, Share2, CalendarClock, Megaphone, ListChecks, Workflow, LayoutGrid, Plug, Wrench, Phone, Link as LinkIcon, Shield } from 'lucide-react'
import TierBadge from './TierBadge'
import ActivityBoard from './ActivityBoard'
import ExportBar from './ExportBar'

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
        <div className="flex items-center gap-4">
          <ExportBar data={data} />
          <TierBadge tier={tier} />
        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="font-medium">Behavior Rules</div>
                <ul className="list-disc pl-5 text-sm">
                  {(data.chatbot_persona?.outputs?.behavior_rules||[]).map((b,i)=>(<li key={i}>{b}</li>))}
                </ul>
              </div>
              <div>
                <div className="font-medium">Quick Actions</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(data.chatbot_persona?.outputs?.quick_actions||[]).map((qa,i)=>(<span key={i} className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs ring-1 ring-indigo-200">{qa}</span>))}
                </div>
                <div className="mt-2 text-xs text-gray-600">Lead Fields: {(data.chatbot_persona?.outputs?.lead_form_fields||[]).join(', ')}</div>
              </div>
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
                  <tr key={i} className="odd:bg:white even:bg-gray-50">
                    <td className="p-2">{r.day}</td>
                    <td className="p-2">{r.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Booking / Appointments" icon={CalendarClock}>
          <div className="text-sm">Booking link: <a className="text-indigo-600 underline" href={data.booking_tools?.booking_link} target="_blank" rel="noreferrer">{data.booking_tools?.booking_link}</a></div>
          <div className="text-xs text-gray-600">Reminders: {(data.booking_tools?.reminders||[]).join(', ')}</div>
          {data.booking_tools?.calendar_sync && (<div className="text-xs text-green-700 mt-1">Calendar sync enabled</div>)}
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

        {/* New sections per expanded spec */}
        <Card title="Social Account Connections" icon={Plug}>
          <p className="text-sm">Connect your existing accounts. We will never create new accounts.</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(data.social_oauth?.status || {}).map(([k,v]) => (
              <div key={k} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
                <span className="capitalize">{k}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${v === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Website Actions" icon={Wrench}>
          <div className="text-sm">Mode: <span className="font-medium capitalize">{data.website_actions?.mode}</span></div>
          {data.website_actions?.ask_for && (
            <div className="mt-2">
              <div className="font-medium">We will ask for:</div>
              <ul className="list-disc pl-5 text-sm">
                {Object.entries(data.website_actions.ask_for).map(([k,v]) => (<li key={k} className="capitalize">{k}: <span className="text-gray-600">{v}</span></li>))}
              </ul>
            </div>
          )}
          {data.website_actions?.generate && (
            <div className="mt-2">
              <div className="font-medium">We'll generate:</div>
              <ul className="list-disc pl-5 text-sm">
                {(data.website_actions.generate||[]).map((g,i)=>(<li key={i}>{g}</li>))}
              </ul>
            </div>
          )}
          {data.website_actions?.deployment && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {Object.entries(data.website_actions.deployment).map(([k,v]) => (
                <div key={k} className={`text-xs rounded border p-2 ${v ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                  <span className="capitalize">{k.replace('_',' ')}</span>: <span className="font-medium">{v ? 'enabled' : 'locked'}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {data.caller_bot && (
          <Card title="Caller Bot / Voice AI" icon={Phone}>
            <div className="text-sm">Dedicated number: <span className="font-medium">Provisioned</span></div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs rounded border p-2 bg-emerald-50 border-emerald-200 text-emerald-800">IVR menu ready</div>
              <div className="text-xs rounded border p-2 bg-emerald-50 border-emerald-200 text-emerald-800">Voice-to-text enabled</div>
              <div className="text-xs rounded border p-2 bg-emerald-50 border-emerald-200 text-emerald-800">Post-call SMS</div>
              <div className="text-xs rounded border p-2 bg-emerald-50 border-emerald-200 text-emerald-800">Forward to owner</div>
            </div>
            <div className="mt-2">
              <div className="font-medium">Call flows</div>
              <ul className="list-disc pl-5 text-sm">
                {(data.caller_bot.flows||[]).map((f,i)=>(<li key={i}>{f}</li>))}
              </ul>
            </div>
          </Card>
        )}

        <Card title="Multi-Platform Support" icon={Shield}>
          <div className="text-sm">Consistent assistant across channels.</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data.multi_platform?.channels||[]).map((c,i)=>(<span key={i} className="inline-flex items-center rounded-full bg-gray-50 text-gray-800 px-2 py-0.5 text-xs ring-1 ring-gray-200">{c}</span>))}
          </div>
        </Card>

        <Card title="Subscriptions & Plan Logic" icon={Shield}>
          <div className="text-sm">Current plan: <span className="font-medium capitalize">{data.subscriptions?.current}</span></div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            {['starter','standard','premium'].map((p)=> (
              <div key={p} className={`rounded-lg border p-3 ${data.subscriptions?.current===p ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <div className="font-medium capitalize">{p}</div>
                <div className="text-xs text-gray-700 mt-1">Includes:</div>
                <ul className="list-disc pl-5 text-xs">
                  {(data.subscriptions?.[p]?.includes||[]).slice(0,6).map((i,idx)=>(<li key={idx}>{i}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Marketing Plan" icon={Megaphone}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="font-medium">Strategy</div>
              <ul className="list-disc pl-5 text-sm">
                {(data.marketing_plan?.strategy||[]).map((s,i)=>(<li key={i}>{s}</li>))}
              </ul>
            </div>
            <div>
              <div className="font-medium">Cadence</div>
              <ul className="list-disc pl-5 text-sm">
                {Object.entries(data.marketing_plan?.cadence||{}).map(([k,v]) => (<li key={k} className="capitalize">{k}: {v}</li>))}
              </ul>
              <div className="mt-2 text-xs text-gray-600">Channels: {(data.marketing_plan?.channels||[]).join(', ')}</div>
            </div>
          </div>
        </Card>

        <Card title="SEO Keywords" icon={Globe}>
          <div className="flex flex-wrap gap-2">
            {(data.seo_keywords||[]).slice(0,20).map((kw,i)=>(<span key={i} className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 text-xs ring-1 ring-emerald-200">{kw}</span>))}
          </div>
        </Card>

        <Card title="User Access Links" icon={LinkIcon}>
          <ul className="list-disc pl-5">
            {Object.entries(data.user_access_links||{}).map(([k,v]) => (
              v ? (
                <li key={k} className="capitalize"><a className="text-indigo-600 underline" href={v} target="_blank" rel="noreferrer">{k}</a></li>
              ) : (
                <li key={k} className="capitalize text-gray-600">{k} — not provisioned</li>
              )
            ))}
          </ul>
        </Card>
      </div>

      <ActivityBoard data={data} />
    </div>
  )
}
