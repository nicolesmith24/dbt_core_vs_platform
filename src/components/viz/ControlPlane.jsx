import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../ui'
import { totalOwnedComponents } from '../../data/claims'

// Layered control-plane diagram (modeled on dbt's own architecture visual):
// Governed context & management → personas → pipeline → cross-platform data mesh.
// The toggle flips the top governance layer between "managed by the platform"
// and "you build & run every piece" (self-hosted dbt Core).

const governance = ['Orchestration', 'Observability', 'Cost management', 'Catalog', 'Semantics']
const personas = ['Data / analytics engineers', 'Agents', 'Analysts / business stakeholders']
const warehouses = ['Snowflake', 'BigQuery', 'Databricks', 'Redshift', 'Fabric', 'Postgres', 'Starburst']

export default function ControlPlane() {
  const [mode, setMode] = useState('platform')
  const platform = mode === 'platform'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
      {/* Toggle */}
      <div className="flex justify-center mb-5">
        <div className="seg-toggle">
          <button onClick={() => setMode('platform')} className={`seg-btn ${platform ? 'seg-btn-active' : ''}`}>dbt platform</button>
          <button onClick={() => setMode('self')} className={`seg-btn ${!platform ? 'seg-btn-active' : ''}`}>Self-hosted dbt Core</button>
        </div>
      </div>

      <div className="space-y-2.5">
        {/* Layer 1 — Governed context & management */}
        <AnimatePresence mode="wait">
          {platform ? (
            <motion.div key="gov-plat" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white font-bold text-sm tracking-tight">dbt</span>
                <span className="text-white font-bold text-sm">Governed context &amp; management</span>
                <span className="ml-auto text-[11px] text-white/80 inline-flex items-center gap-1">
                  <Icon name="check" className="w-3.5 h-3.5" /> managed
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {governance.map(g => (
                  <div key={g} className="rounded-lg bg-white/95 px-2.5 py-2 text-center text-[12px] font-medium text-gray-800">{g}</div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="gov-self" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-sm text-gray-900">Governed context &amp; management</span>
                <span className="ml-auto text-[11px] text-amber-700 inline-flex items-center gap-1">
                  <Icon name="wrench" className="w-3.5 h-3.5" /> you build &amp; run all of this
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {governance.map(g => (
                  <div key={g} className="rounded-lg bg-white border border-dashed border-amber-300 px-2.5 py-2 text-center text-[12px] font-medium text-gray-500">{g}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2 — Personas (platform only: everyone gets a safe on-ramp) */}
        {platform && (
          <div className="rounded-2xl bg-indigo-600 p-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {personas.map(p => (
                <div key={p} className="rounded-lg bg-white px-3 py-2 text-center text-[12px] font-medium text-indigo-700">{p}</div>
              ))}
            </div>
          </div>
        )}

        {/* Layer 3 — Pipeline */}
        <div className="rounded-2xl bg-gray-100 p-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 sm:mr-2">Pipeline</span>
            <div className="flex-1 rounded-lg bg-white border border-gray-200 px-3 py-2 text-center text-[12px] font-medium text-gray-700">Ingestion</div>
            <Icon name="arrow" className="w-4 h-4 text-gray-400 self-center rotate-90 sm:rotate-0" />
            <div className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center text-[12px] font-semibold text-white">
              <span className="text-orange-300">dbt</span> Transformation
            </div>
            <Icon name="arrow" className="w-4 h-4 text-gray-400 self-center rotate-90 sm:rotate-0" />
            <div className="flex-1 rounded-lg bg-white border border-gray-200 px-3 py-2 text-center text-[12px] font-medium text-gray-700">Agents / AI / Analytics</div>
          </div>
        </div>

        {/* Layer 4 — Cross-platform data mesh */}
        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 sm:w-40 shrink-0">Cross-platform data mesh</span>
            <div className="flex flex-wrap gap-2">
              {warehouses.map(w => (
                <span key={w} className="rounded-md bg-gray-50 border border-gray-200 px-2.5 py-1 text-[11px] text-gray-500">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-5 pt-5 border-t border-gray-100 text-center min-h-[48px]">
        <AnimatePresence mode="wait">
          {platform ? (
            <motion.p key="cap-plat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="text-sm text-gray-600">
              The dbt platform provides the whole control plane as one managed product — so engineers, analysts, and AI agents all work from the same governed foundation.
            </motion.p>
          ) : (
            <motion.p key="cap-self" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="text-sm text-gray-700">
              dbt Core gives you the transformation box. The control plane above —{' '}
              <span className="font-semibold text-gray-900">{totalOwnedComponents}+ operational components</span> — is yours to build and run, and in practice only technical CLI users can safely contribute.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
