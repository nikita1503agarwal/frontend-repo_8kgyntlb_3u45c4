import React from 'react'
import { CheckCircle2, CalendarDays, Globe, Bot, Rocket, Zap, ClipboardList } from 'lucide-react'

function Task({ label, done=false }){
  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3 ${done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
      ) : (
        <ClipboardList className="h-5 w-5 text-gray-500 mt-0.5" />
      )}
      <span className={`text-sm ${done ? 'text-green-800 line-through' : 'text-gray-800'}`}>{label}</span>
    </div>
  )
}

export default function ActivityBoard({ data }){
  if(!data) return null
  const tier = data.subscription_tier
  const includes = (feature) => {
    const order = { starter: 0, standard: 1, premium: 2 }
    const gates = { website: 1, ads: 1, booking: 1, voice: 2, crm: 2 }
    return (order[tier] ?? 0) >= (gates[feature] ?? 0)
  }

  const setupTasks = [
    `Add brand colors ${data.brand_identity?.colors?.join(', ')}`,
    `Set voice: ${data.brand_identity?.voice}`,
    'Upload logo and favicon',
    'Connect your domain',
  ]

  const websiteTasks = [
    'Create Home, About, Services, Pricing, Contact pages',
    includes('website') ? 'Enable chat widget and booking on site' : 'Upgrade to enable site chat & booking',
    'Add SEO titles and descriptions',
  ]

  const contentTasks = [
    'Schedule 30-day social calendar',
    'Prepare 10 evergreen posts',
    includes('ads') ? 'Generate ad headlines & primary text' : 'Upgrade for ad generators',
  ]

  const automationTasks = [
    'New lead → send welcome email',
    'New booking → send SMS reminder',
    includes('crm') ? 'Sync contacts to CRM' : 'Upgrade for CRM sync',
  ]

  return (
    <section className="mt-8">
      <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Your Launch Checklist</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-medium"><Bot className="h-4 w-4" /> Setup</div>
            <div className="space-y-2">{setupTasks.map((t,i)=>(<Task key={i} label={t} done={i===0} />))}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-medium"><Globe className="h-4 w-4" /> Website</div>
            <div className="space-y-2">{websiteTasks.map((t,i)=>(<Task key={i} label={t} done={i===0} />))}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-medium"><CalendarDays className="h-4 w-4" /> Content</div>
            <div className="space-y-2">{contentTasks.map((t,i)=>(<Task key={i} label={t} done={i===0} />))}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-medium"><Zap className="h-4 w-4" /> Automations</div>
            <div className="space-y-2">{automationTasks.map((t,i)=>(<Task key={i} label={t} done={i===0} />))}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
