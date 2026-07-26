import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './components/ui'

import Overview from './components/modules/Overview'
import DevelopmentWorkflow from './components/modules/DevelopmentWorkflow'
import Orchestration from './components/modules/Orchestration'
import Mesh from './components/modules/Mesh'
import SemanticLayer from './components/modules/SemanticLayer'
import AI from './components/modules/AI'
import Security from './components/modules/Security'

const tabs = [
  { key: 'overview', label: 'Overview', component: Overview },
  { key: 'development', label: 'Development workflow', icon: 'branch', component: DevelopmentWorkflow },
  { key: 'orchestration', label: 'Orchestration', icon: 'clock', component: Orchestration },
  { key: 'mesh', label: 'Mesh', icon: 'layers', component: Mesh },
  { key: 'semantic', label: 'Semantic Layer', icon: 'gauge', component: SemanticLayer },
  { key: 'ai', label: 'AI', icon: 'sparkles', component: AI },
  { key: 'security', label: 'Security & governance', icon: 'shield', component: Security },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

export default function App() {
  const [tabKey, setTabKey] = useState('overview')
  const tab = tabs.find(t => t.key === tabKey)
  const ActiveComponent = tab.component

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tabKey])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12)_0%,_transparent_60%)]" />
        <div className="section-container py-6 relative text-center">
          <button onClick={() => setTabKey('overview')} className="inline-block">
            <h1 className="text-white text-2xl md:text-3xl">
              dbt platform <span className="text-white/40 font-normal">vs.</span> self-hosting
            </h1>
          </button>
        </div>
      </div>

      {/* Top-tab nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="section-container py-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max justify-center">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTabKey(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  tabKey === t.key ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}>
                {t.icon && <Icon name={t.icon} className="w-4 h-4" />}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tabKey} {...pageTransition}>
          <div className="section-container py-12 md:py-16">
            <ActiveComponent />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="section-container py-8">
          <p className="text-sm text-gray-400 text-center">
            dbt Core is open source under the Apache 2.0 license. The dbt platform is a commercial product from dbt Labs.
          </p>
        </div>
      </footer>
    </div>
  )
}
