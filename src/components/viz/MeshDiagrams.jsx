import { Icon } from '../ui'

// The two bad self-hosted options for sharing models across teams.
export function MeshSharingDiagram() {
  return (
    <div className="mt-5 grid md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4">
        <div className="text-xs font-semibold text-amber-700 mb-3">Option A · one monolith repo</div>
        <div className="rounded-lg bg-white border border-gray-200 p-3">
          <div className="flex flex-wrap gap-1.5">
            {['Finance', 'Sales', 'Marketing', 'Data Science', 'Platform'].map(t => (
              <span key={t} className="text-[11px] rounded bg-gray-100 px-2 py-1 text-gray-700">{t}</span>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-2.5">Every team in one project — no ownership boundaries, constant collisions.</p>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4">
        <div className="text-xs font-semibold text-amber-700 mb-3">Option B · import a whole project as a package</div>
        <div className="rounded-lg bg-white border border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] rounded bg-gray-100 px-2 py-1.5 text-gray-700">Your project</span>
            <span className="flex items-center gap-1 text-amber-600 text-[10px]">
              <span className="border-t border-dashed border-amber-400 w-5" />git pull
            </span>
            <span className="text-[11px] rounded bg-gray-100 px-2 py-1.5 text-gray-700">Their entire project</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2.5">You pin a commit, but inherit their whole project — no governed interface, no access boundary, and you break when they change.</p>
        </div>
      </div>
    </div>
  )
}

// Lineage stops at the project boundary.
function Node({ label, faded }) {
  return (
    <span className={`text-[11px] font-mono rounded px-2 py-1 border ${
      faded ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-gray-900 border-gray-900 text-white'
    }`}>{label}</span>
  )
}

export function LineageBoundaryDiagram() {
  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        <div>
          <div className="text-[11px] font-semibold text-gray-500 mb-2">Your project — visible</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Node label="stg_orders" />
            <Icon name="arrow" className="w-3 h-3 text-gray-300" />
            <Node label="fct_orders" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-1">
          <span className="text-[9px] uppercase tracking-wide text-amber-600 mb-1">boundary</span>
          <div className="w-px flex-1 border-l-2 border-dashed border-amber-400" />
        </div>

        <div>
          <div className="text-[11px] font-semibold text-gray-400 mb-2">Other teams — invisible</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Node label="?" faded />
            <Node label="?" faded />
            <Node label="?" faded />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        Lineage stops at your project. You cannot see which downstream teams break if you change <span className="font-mono">fct_orders</span>.
      </p>
    </div>
  )
}
