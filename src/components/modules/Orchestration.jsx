import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModuleHeader, TheJob, SubTabs, PlatformSelfHostedToggle, CoreLens, OwnershipLedger, CustomerProof, Icon } from '../ui'
import TestingExplanation from '../platform/TestingExplanation'
import SettingUpTests from '../platform/SettingUpTests'
import DbtBuildSimulator from '../platform/DbtBuildSimulator'
import StateAwareOrchestration from '../platform/StateAwareOrchestration'
import SelfHostedOrchestration from '../selfhosted/SelfHostedOrchestration'
import { ledger, customers } from '../../data/claims'

const orchPhases = [
  { key: 'jobs', label: 'Jobs & scheduler' },
  { key: 'testing', label: 'Testing automation' },
  { key: 'state', label: 'dbt State' },
]
const orchPhaseDescs = {
  jobs: 'Define a job, pick a schedule or trigger — the platform runs it and records every run.',
  testing: 'Automated data quality checks that run as part of every build.',
  state: 'The platform detects which sources have new data and rebuilds only what is necessary.',
}
const phase2Tabs = [
  { key: 'concept', label: 'How testing works' },
  { key: 'setup', label: 'Setting up tests' },
  { key: 'simulator', label: 'See it in action' },
]

const cardCls = 'bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm'

// Lightweight representation of the platform's managed jobs + scheduler.
function NativeJobsPanel() {
  const jobRows = [
    { k: 'Trigger', v: 'Schedule · 0 6 * * *  ·  or on merge / API' },
    { k: 'Command', v: 'dbt build' },
    { k: 'Environment', v: 'Production' },
    { k: 'Options', v: 'dbt State · safe parallel execution · auto-cancel stale runs' },
    { k: 'Alerts', v: 'on failure → Slack #data-alerts' },
  ]
  const runs = [
    { status: 'ok', when: 'Today, 6:00 AM', dur: '4m 12s' },
    { status: 'ok', when: 'Yesterday, 6:00 AM', dur: '4m 30s' },
    { status: 'fail', when: '2 days ago, 6:00 AM', dur: '1m 02s' },
    { status: 'ok', when: '3 days ago, 6:00 AM', dur: '4m 08s' },
  ]
  return (
    <div className={cardCls}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center"><Icon name="clock" className="w-4 h-4" /></span>
            <span className="font-semibold text-gray-900 text-sm">Daily production build</span>
            <span className="ml-auto text-[11px] font-medium text-green-600 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> scheduled
            </span>
          </div>
          <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
            {jobRows.map(r => (
              <div key={r.k} className="flex gap-3 px-3 py-2 text-sm">
                <span className="text-gray-400 w-24 shrink-0">{r.k}</span>
                <span className="text-gray-700">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Recent runs</div>
          <div className="space-y-2">
            {runs.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${r.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-gray-700">{r.when}</span>
                <span className="ml-auto font-mono text-xs text-gray-400">{r.dur}</span>
                <span className="text-xs text-orange-600">logs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        The platform schedules, runs, and records every job — run history, logs, and failure alerts included. No
        scheduler or runners to host.
      </p>
    </div>
  )
}

function PlatformOrchestration() {
  const [phase, setPhase] = useState('jobs')
  const [p2, setP2] = useState('concept')

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {orchPhases.map(p => (
          <button key={p.key} onClick={() => setPhase(p.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
              phase === p.key ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">{orchPhaseDescs[phase]}</p>

      <AnimatePresence mode="wait">
        {phase === 'jobs' && (
          <motion.div key="jobs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <NativeJobsPanel />
          </motion.div>
        )}
        {phase === 'testing' && (
          <motion.div key="testing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
            <SubTabs tabs={phase2Tabs} active={p2} onChange={setP2} />
            <div className={cardCls}>
              {p2 === 'concept' && <TestingExplanation />}
              {p2 === 'setup' && <SettingUpTests />}
              {p2 === 'simulator' && <DbtBuildSimulator />}
            </div>
          </motion.div>
        )}
        {phase === 'state' && (
          <motion.div key="state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <div className={cardCls}><StateAwareOrchestration /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Orchestration() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 02"
        title="Orchestrating runs"
        intro="Run the right models, in the right order, on a schedule. dbt derives the build order from ref() and tests as it builds — the same in both worlds. What differs is the machinery that makes it run unattended in production."
      />

      <PlatformSelfHostedToggle
        platform={<PlatformOrchestration />}
        selfhosted={<SelfHostedOrchestration />}
        note="Switch to self-hosted to see everything you set up to run this yourself."
      />

      <CoreLens
        title="What self-hosting adds to your plate"
        intro="The build order and the tests are pure dbt Core. Everything that makes it run on a schedule — the runner, credentials, the DAG, retries, logging, and alerting — is yours to stand up and operate."
      />

      <TheJob>
        Keep production data fresh on a schedule — without rebuilding what didn't change, and without operating
        the machinery underneath.
      </TheJob>

      <div className="grid sm:grid-cols-3 gap-4 mb-2">
        <CustomerProof item={customers.enpalCost} />
        <CustomerProof item={customers.enpalRefresh} />
        <CustomerProof item={customers.sunrunTickets} />
      </div>

      <OwnershipLedger items={ledger.orchestration} />
    </div>
  )
}
