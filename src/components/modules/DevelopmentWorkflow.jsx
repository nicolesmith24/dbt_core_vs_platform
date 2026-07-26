import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModuleHeader, TheJob, SubTabs, OwnershipLedger, CustomerProof, CoreLens, Icon } from '../ui'
import TypicalWorkflow from '../platform/TypicalWorkflow'
import PlatformDevWorkflow from '../platform/DevelopmentWorkflow'
import SelfHostedDevWorkflow from '../selfhosted/SelfHostedDevWorkflow'
import { ledger, customers } from '../../data/claims'

const subTabs = [
  { key: 'flow', label: 'Development flow architecture' },
  { key: 'process', label: 'Development process walkthrough' },
]
const descs = {
  flow: 'The typical flow from feature branch to production.',
  process: 'Walk the end-to-end workflow across develop, QA, and production — on the dbt platform, then the same steps self-hosted.',
}

export default function DevelopmentWorkflow() {
  const [view, setView] = useState('process')
  const [mode, setMode] = useState('platform')

  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 01"
        title="Development workflow"
        intro="How an analytics engineer goes from a feature branch to a tested change running in production — the workflow the dbt platform gives you, and the same steps done technically in self-hosted dbt Core."
      />

      <SubTabs tabs={subTabs} active={view} onChange={setView} description={descs[view]} />

      {view === 'flow' && (
        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
          <TypicalWorkflow />
        </div>
      )}

      {view === 'process' && (
        <div>
          {/* Platform vs. self-hosted toggle — same walkthrough, two realities */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="seg-toggle">
              <button onClick={() => setMode('platform')}
                className={`seg-btn ${mode === 'platform' ? 'seg-btn-active' : ''}`}>
                dbt platform
              </button>
              <button onClick={() => setMode('selfhosted')}
                className={`seg-btn ${mode === 'selfhosted' ? 'seg-btn-active' : ''}`}>
                Self-hosted dbt Core
              </button>
            </div>
            <span className="text-xs text-gray-400 inline-flex items-center gap-1.5">
              <Icon name="arrow" className="w-3.5 h-3.5" />
              Same steps — switch to see what each takes when you run it yourself.
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className={mode === 'platform' ? 'bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm' : ''}>
              {mode === 'platform' ? <PlatformDevWorkflow /> : <SelfHostedDevWorkflow />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── The cost of self-hosting, summarized ── */}
      <CoreLens
        title="What self-hosting adds to your plate"
        intro="The steps are the same either way. Self-hosted, the environment, the CI pipeline, the state plumbing, and the production job around them all become yours to build and operate."
      />

      <TheJob>
        Build a model, prove it's correct, and ship it to production safely — and keep that loop fast as the team
        and the project grow.
      </TheJob>

      <div className="grid sm:grid-cols-3 gap-4 mb-2">
        <CustomerProof item={customers.axsDeploy} />
        <CustomerProof item={customers.plentificBreaks} />
        <CustomerProof item={customers.docusignImpact} />
      </div>

      <OwnershipLedger items={ledger.development} />
    </div>
  )
}
