import { Icon } from '../ui'

const stages = [
  { name: 'metrics.yml', sub: 'you already have this', tone: 'have' },
  { name: 'MetricFlow service', sub: 'long-lived, highly available', tone: 'build' },
  { name: 'Query API', sub: 'JDBC + GraphQL, auth, rate limits', tone: 'build' },
  { name: 'BI connectors', sub: 'Tableau · Looker · Power BI · Excel', tone: 'build' },
  { name: 'Your tools & apps', sub: 'finally can ask for a metric', tone: 'end' },
]

const toneCls = {
  have: 'border-gray-200 bg-white text-gray-700',
  build: 'border-dashed border-amber-300 bg-amber-50/50 text-gray-900',
  end: 'border-gray-200 bg-gray-900 text-white',
}

// The service you'd have to build and run to serve metrics yourself.
export default function SemanticService() {
  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
        To serve one metric to your tools, you build and operate this whole chain
      </div>
      <div className="flex flex-col md:flex-row md:items-stretch gap-2">
        {stages.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2 md:flex-1">
            <div className={`flex-1 rounded-xl border px-3 py-2.5 ${toneCls[s.tone]}`}>
              <div className="text-[13px] font-semibold leading-tight">{s.name}</div>
              <div className={`text-[11px] mt-0.5 ${s.tone === 'end' ? 'text-white/60' : 'text-gray-500'}`}>{s.sub}</div>
              {s.tone === 'build' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 mt-1.5">
                  <Icon name="wrench" className="w-2.5 h-2.5" /> you build & host
                </span>
              )}
            </div>
            {i < stages.length - 1 && (
              <Icon name="arrow" className="w-4 h-4 text-gray-300 shrink-0 rotate-90 md:rotate-0" />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
        <Icon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-orange-500" />
        …and version-lock the whole chain to your dbt project on every deploy. On the dbt platform, this is one managed API.
      </p>
    </div>
  )
}
