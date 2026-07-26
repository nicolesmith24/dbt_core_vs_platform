import { Icon } from '../ui'

// Deck slide 9: self-hosting works at the start and strains as you scale.
const stages = [
  { phase: 'Starting', tag: 'Local dbt Core', team: '1–3 builders', models: '10–50 models', note: 'Self-hosted dbt Core works great.', tone: 'ok' },
  { phase: 'Growing complexity', tag: 'Local dbt Core', team: '4–10 contributors', models: '50–200 models', note: 'More jobs, more dependencies, more use cases.', tone: 'warn' },
  { phase: 'Scaling pain', tag: 'Local dbt Core', team: '10+ teams blocked', models: '200+ models', note: 'Fragile orchestration, custom CI, tool sprawl — breaks, spiraling costs, slow releases, trust gaps.', tone: 'pain' },
  { phase: 'Trusted, cost-optimized & AI-ready', tag: 'dbt platform', team: 'Many teams self-serve', models: 'Models shared & reused', note: 'Non-technical users unblocked; governed and scalable.', tone: 'platform' },
]

const toneCls = {
  ok: 'border-gray-200 bg-white',
  warn: 'border-amber-200 bg-amber-50/40',
  pain: 'border-amber-300 bg-amber-100/50',
  platform: 'border-orange-300 ring-1 ring-orange-100 bg-white',
}
const bar = { ok: 'w-1/4 bg-gray-300', warn: 'w-2/4 bg-amber-300', pain: 'w-full bg-amber-500', platform: 'w-1/4 bg-orange-500' }

export default function MaturityJourney() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The path most teams take</div>
      <p className="text-sm text-gray-500 mb-5">Self-hosting gets you started — the effort curve is what changes as you scale.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {stages.map((s, i) => (
          <div key={i} className="flex items-stretch gap-3 md:block">
            <div className={`flex-1 rounded-xl border p-4 ${toneCls[s.tone]}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
                  s.tag === 'dbt platform' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}>{s.tag}</span>
              </div>
              <div className="font-semibold text-gray-900 text-sm leading-tight mb-2">{s.phase}</div>
              <div className="text-[12px] text-gray-500">{s.team}</div>
              <div className="text-[12px] text-gray-500 mb-2">{s.models}</div>
              <div className="h-1 rounded-full bg-gray-100 overflow-hidden mb-2">
                <div className={`h-full rounded-full ${bar[s.tone]}`} />
              </div>
              <p className="text-[12px] text-gray-600 leading-snug">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
        <Icon name="arrow" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-orange-500" />
        The engine never changes — what changes is how much you operate around it. The platform is where teams go when the effort stops scaling with the value.
      </p>
    </div>
  )
}
