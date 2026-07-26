import { Icon } from '../ui'

// Modeled on the sales deck's "time to answer / can you trust it?" comparison.
const selfSteps = [
  'Parse run_results.json from S3',
  'Check the orchestrator for the last successful run',
  'Manually trace upstream model dependencies',
  'Cross-reference sources.yml for freshness',
  'Compile the evidence and relay it to the stakeholder',
]
const platformReturns = [
  'ARR value from a governed metric definition',
  'Tests passed · 2h ago',
  'Source data fresh · 6h ago',
  'Certified · ready_for_ai',
  'No pipeline failures in 7 days',
]

export default function AgentGrounding() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-8">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Ask an AI agent a board-level question</div>
      <p className="text-base font-semibold text-gray-900 mb-5">
        “What's our ARR this quarter — and can I trust it enough to share with the board?”
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Self-hosted */}
        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="pill pill-core">self-hosted dbt Core</span>
            <span className="text-right">
              <span className="block text-xl font-bold text-amber-700 leading-none">45–90 min</span>
              <span className="text-[11px] text-amber-700/80">trust: uncertain</span>
            </span>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">The agent has to</div>
          <ul className="space-y-1.5">
            {selfSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] flex items-center justify-center shrink-0">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Platform */}
        <div className="rounded-xl border border-orange-200 ring-1 ring-orange-100 bg-white p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="pill pill-platform">dbt platform</span>
            <span className="text-right">
              <span className="block text-xl font-bold text-orange-600 leading-none">real-time</span>
              <span className="text-[11px] text-green-600 inline-flex items-center gap-1"><Icon name="check" className="w-3 h-3" /> certified</span>
            </span>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">The agent returns</div>
          <ul className="space-y-1.5">
            {platformReturns.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Same agent, same question. The difference is whether the context it needs — metrics, freshness, tests, lineage — is a governed API call or a manual archaeology project.
      </p>
    </div>
  )
}
