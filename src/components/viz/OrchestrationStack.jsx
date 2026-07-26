import { Icon } from '../ui'

const parts = [
  { icon: 'clock', name: 'Scheduler', sub: 'Airflow / Dagster / cron' },
  { icon: 'server', name: 'Runner + compute', sub: 'containerized dbt' },
  { icon: 'git', name: 'CI/CD scripts', sub: 'brittle, hand-written' },
  { icon: 'lock', name: 'Secrets store', sub: 'warehouse credentials' },
  { icon: 'layers', name: 'Artifact storage', sub: 'manifest, run results' },
  { icon: 'eye', name: 'Quality monitoring', sub: 'Elementary / Monte Carlo' },
  { icon: 'alert', name: 'Logging & alerting', sub: 'so failures reach a human' },
  { icon: 'dollar', name: 'Cost monitoring', sub: 'watch the warehouse bill' },
]

// The contrast: dbt Core is one box; running it in production means bolting on
// (and maintaining) everything around it.
export default function OrchestrationStack() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-5">
      <div className="grid md:grid-cols-[180px_1fr] gap-5 items-stretch">
        {/* What you get */}
        <div className="flex flex-col">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">What you get</div>
          <div className="flex-1 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 flex flex-col justify-center">
            <span className="font-mono text-sm">dbt Core (CLI)</span>
            <span className="text-[12px] text-white/60 mt-1">runs SQL, transforms — free, and identical either way</span>
          </div>
        </div>

        {/* What you must build around it */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">To run it in production, you build &amp; maintain</div>
            <span className="text-[11px] text-gray-400">— often owned by one engineer</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {parts.map(p => (
              <div key={p.name} className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon name={p.icon} className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="text-[12.5px] font-semibold text-gray-900 leading-tight">{p.name}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100 flex items-start gap-1.5">
        <Icon name="alert" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
        You maintain all of it. Every upgrade is a risk, every analyst request is a ticket, and every production break at 2am is yours to solve — on the platform, this whole layer is managed.
      </p>
    </div>
  )
}
