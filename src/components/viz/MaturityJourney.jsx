import { Icon } from '../ui'

// Deck slide 9, reframed: the three self-hosted stages are a rising-effort curve;
// the dbt platform is the off-ramp teams take — effort drops, value rises.
const selfStages = [
  { phase: 'Starting', size: '1–3 builders · 10–50 models', note: 'Self-hosted dbt Core works great.', effort: 'w-1/3' },
  { phase: 'Growing complexity', size: '4–10 contributors · 50–200 models', note: 'More jobs, dependencies, and use cases.', effort: 'w-2/3' },
  { phase: 'Scaling pain', size: '10+ teams · 200+ models', note: 'Fragile orchestration, tool sprawl, breaks, spiraling cost, trust gaps.', effort: 'w-full' },
]

export default function MaturityJourney() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The path most teams take</div>
      <p className="text-sm text-gray-500 mb-5">
        On self-hosted dbt Core, effort keeps climbing as you scale — but value doesn't. The dbt platform is the
        off-ramp: the point where teams get off that curve.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        {/* Rising-effort self-hosted path */}
        <div className="lg:flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 mb-2">
            Self-hosted dbt Core — effort climbs, value doesn't
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {selfStages.map((s, i) => (
              <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 flex flex-col">
                <div className="font-semibold text-gray-900 text-sm leading-tight mb-1">{s.phase}</div>
                <div className="text-[11px] text-gray-500 mb-2">{s.size}</div>
                <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden mb-2">
                  <div className={`h-full rounded-full bg-amber-500 ${s.effort}`} />
                </div>
                <p className="text-[12px] text-gray-600 leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The shift */}
        <div className="flex lg:flex-col items-center justify-center gap-1 text-orange-500 shrink-0">
          <Icon name="arrow" className="w-6 h-6 rotate-90 lg:rotate-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-orange-500 whitespace-nowrap">the shift</span>
        </div>

        {/* Platform destination */}
        <div className="lg:w-72 shrink-0 rounded-xl border-2 border-orange-300 ring-1 ring-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 flex flex-col">
          <span className="inline-flex items-center gap-1 self-start rounded-full bg-orange-500 text-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mb-2">
            Where teams land
          </span>
          <div className="font-bold text-gray-900 text-base leading-tight mb-1">dbt platform</div>
          <p className="text-[12px] text-gray-600 leading-snug mb-3">
            Trusted, cost-optimized, and AI-ready. Many teams self-serve; non-technical users are unblocked, and models are shared and reused.
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 border border-green-200 px-2 py-1 text-[11px] font-medium text-green-700">↓ effort</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 border border-orange-200 px-2 py-1 text-[11px] font-medium text-orange-700">↑ value &amp; scale</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
        <Icon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-orange-500" />
        The engine never changes — what changes is the effort around it. The platform is where most teams take dbt to scale, not a harder rung on the same ladder.
      </p>
    </div>
  )
}
