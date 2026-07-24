import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './components/ui'

import Develop from './components/modules/Develop'
import Orchestrate from './components/modules/Orchestrate'
import CICD from './components/modules/CICD'
import Discover from './components/modules/Discover'

const modules = [
  { key: 'develop', label: '01  Develop', icon: 'compass', component: Develop },
  { key: 'orchestrate', label: '02  Orchestrate', icon: 'clock', component: Orchestrate },
  { key: 'cicd', label: '03  CI/CD & environments', icon: 'git', component: CICD },
  { key: 'discover', label: '04  Discover & govern', icon: 'layers', component: Discover },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

export default function App() {
  const [active, setActive] = useState('develop')
  const ActiveComponent = modules.find(m => m.key === active)?.component

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [active])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12)_0%,_transparent_60%)]" />
        <div className="section-container py-12 md:py-16 relative text-center">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-medium text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              A field guide for data teams
            </div>
            <h1 className="text-white mb-4">
              dbt Core <span className="text-white/40 font-normal">vs.</span> the dbt platform
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              dbt Core is the open source transformation engine you run yourself. The dbt platform is the
              control plane around it. This guide walks four everyday jobs and shows what each takes when
              you self-host versus when the platform runs it for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Module nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="section-container py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max justify-center">
            {modules.map(mod => (
              <button
                key={mod.key}
                onClick={() => setActive(mod.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  active === mod.key
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Icon name={mod.icon} className="w-4 h-4" />
                {mod.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={active} {...pageTransition}>
          <div className="section-container py-12 md:py-16">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="section-container py-8 text-center">
          <p className="text-sm text-gray-400">
            dbt Core is open source under the Apache 2.0 license. The dbt platform is a commercial product from dbt Labs.
          </p>
        </div>
      </footer>
    </div>
  )
}
