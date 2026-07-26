import { motion } from 'framer-motion'
import { Icon, CustomerProof, CoreStrengthCallout, SourceLink } from '../ui'
import { customers, ledger, totalOwnedComponents, sources } from '../../data/claims'

const areas = [
  { key: 'development', icon: 'branch', name: 'Development workflow', self: 'Local CLI + venv + hand-rolled CI', plat: 'dbt Studio, managed CI, deferral' },
  { key: 'orchestration', icon: 'clock', name: 'Orchestration', self: 'A scheduler stack you host and operate', plat: 'Native jobs + dbt State' },
  { key: 'mesh', icon: 'layers', name: 'Mesh', self: 'Cross-project sharing by convention', plat: 'Governed refs, lineage, contracts' },
  { key: 'semantic', icon: 'gauge', name: 'Semantic Layer', self: 'Metrics re-defined in every tool', plat: 'One governed metrics layer + API' },
  { key: 'ai', icon: 'sparkles', name: 'AI', self: 'Agents guess against raw SQL', plat: 'dbt Wizard + MCP + trusted context' },
  { key: 'security', icon: 'shield', name: 'Security & governance', self: 'Warehouse grants; auth & audit are DIY', plat: 'RBAC/SSO, audit, support & SLAs' },
]

export default function Overview() {
  return (
    <div>
      {/* Framing */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Overview</div>
        <h2 className="mb-4">The same engine. A very different operation.</h2>
        <p className="text-lg text-gray-500">
          dbt Core is the open source engine that transforms your data. The dbt platform is the managed product
          built on top of it — the control plane that runs, watches, governs, and secures everything around that
          engine. When you self-host dbt Core, that control plane is yours to build and operate.
        </p>
      </div>

      {/* Engine + control plane */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-4">
            <div className="text-xs uppercase tracking-widest text-orange-300 mb-1">the engine</div>
            <div className="text-xl font-bold">dbt Core</div>
            <div className="text-sm text-white/60">open source data transformation</div>
          </motion.div>
          <div className="text-xs text-gray-400 mt-4 max-w-md">
            Free, flexible, and identical whichever way you run it. The question isn't the engine — it's
            everything the engine needs around it to run in production.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((a, i) => (
            <motion.div key={a.key}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                  <Icon name={a.icon} className="w-4 h-4" />
                </span>
                <span className="font-semibold text-gray-900 text-sm">{a.name}</span>
              </div>
              <div className="text-xs text-gray-500 flex gap-2 mb-1.5">
                <span className="pill pill-core shrink-0 !text-[9px] !px-2 !py-0.5">self</span>
                <span className="leading-snug">{a.self}</span>
              </div>
              <div className="text-xs text-gray-600 flex gap-2">
                <span className="pill pill-platform shrink-0 !text-[9px] !px-2 !py-0.5">platform</span>
                <span className="leading-snug">{a.plat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Running tally */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div className="text-center md:text-left md:border-r md:border-gray-100 md:pr-10">
            <div className="text-5xl font-bold tracking-tight text-gray-900">{totalOwnedComponents}+</div>
            <p className="text-sm text-gray-500 mt-1 max-w-[160px] mx-auto md:mx-0">
              operational components you run yourself when you self-host
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {areas.map(a => (
              <div key={a.key} className="flex items-center justify-between border-b border-gray-100 py-1.5 text-sm">
                <span className="text-gray-600">{a.name}</span>
                <span className="font-mono text-gray-400">{ledger[a.key].length} to own</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          Added up, that's less a piece of software to install than a standing platform-engineering commitment —
          real headcount to build and operate it, and when it breaks at 2am, no vendor SLA behind the fix.
        </p>
      </div>

      {/* Customer outcomes */}
      <div className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          What teams reported after moving from dbt Core to the platform
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <CustomerProof item={customers.whoopHours} />
          <CustomerProof item={customers.sunrunDeploy} />
          <CustomerProof item={customers.axsMaintenance} />
        </div>
      </div>

      <CoreStrengthCallout>
        None of this makes dbt Core the wrong choice. dbt itself positions self-hosting as a good fit for small,
        highly technical teams with simpler deployments — a deliberate trade of lower software cost for higher
        operational ownership. The pages that follow are about what that ownership actually costs as a team scales.{' '}
        <SourceLink source={sources.pricing} className="!inline" />
      </CoreStrengthCallout>
    </div>
  )
}
