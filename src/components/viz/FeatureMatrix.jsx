import { Icon } from '../ui'

// Deck slide 17: self-hosting vs fully managed on the dbt platform.
// self: 'yes' | 'diy' | 'no'
const groups = [
  {
    name: 'Basics',
    rows: [
      { f: 'Build SQL transformations', self: 'yes' },
      { f: 'Validate code before it ships (CI)', self: 'diy' },
    ],
  },
  {
    name: 'Reduce cost & overhead',
    rows: [
      { f: 'dbt State — rebuild only what changed', self: 'no' },
      { f: 'Cloud-native & fully managed with 99.9% uptime SLA', self: 'no' },
    ],
  },
  {
    name: 'Trusted AI & analytics',
    rows: [
      { f: 'Centralized business metrics (Semantic Layer)', self: 'diy' },
      { f: 'Data context for AI via MCP server & Metadata API', self: 'diy' },
      { f: 'Column-level lineage & impact analysis', self: 'no' },
    ],
  },
  {
    name: 'Scale with governed collaboration',
    rows: [
      { f: 'Domain-level ownership with dbt Mesh', self: 'no' },
      { f: 'RBAC, SSO & audit logging', self: 'no' },
    ],
  },
]

function SelfCell({ v }) {
  if (v === 'yes') return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600"><Icon name="check" className="w-3.5 h-3.5" /> yes</span>
  if (v === 'diy') return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700"><Icon name="wrench" className="w-3 h-3" /> DIY</span>
  return <span className="text-[11px] font-medium text-gray-300">—</span>
}

export default function FeatureMatrix() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Self-hosting vs. dbt platform, at a glance</div>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4">
        <div />
        <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 text-center min-w-[72px] pb-2">Self-hosted</div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-orange-500 text-center min-w-[72px] pb-2">Platform</div>

        {groups.map(g => (
          <div key={g.name} className="contents">
            <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400 pt-3 pb-1 border-t border-gray-100">{g.name}</div>
            {g.rows.map(r => (
              <div key={r.f} className="contents">
                <div className="text-sm text-gray-700 py-2 border-t border-gray-50">{r.f}</div>
                <div className="py-2 border-t border-gray-50 flex items-center justify-center"><SelfCell v={r.self} /></div>
                <div className="py-2 border-t border-gray-50 flex items-center justify-center">
                  <Icon name="check" className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        <span className="inline-flex items-center gap-1 text-amber-700"><Icon name="wrench" className="w-3 h-3" /> DIY</span> = possible with dbt Core, but you build, host, and maintain it yourself.
      </p>
    </div>
  )
}
