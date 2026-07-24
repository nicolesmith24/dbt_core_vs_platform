import { motion } from 'framer-motion'
import { ModuleHeader, TheJob, SplitCompare, ComparePanel, FeatureList, CodeBlock, Takeaway, Icon } from '../ui'

function PRFlow() {
  const steps = [
    { label: 'Open pull request', sub: 'analytics engineer proposes a change' },
    { label: 'CI job runs', sub: 'build only modified models + downstream' },
    { label: 'Tests execute', sub: 'in an isolated, temporary schema' },
    { label: 'Status posts to PR', sub: 'reviewer sees green before merge' },
  ]
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 mt-10">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-5">
        What a continuous integration check looks like
      </div>
      <div className="flex flex-col md:flex-row md:items-stretch gap-3">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3 md:flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            >
              <div className="text-sm font-semibold text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <Icon name="arrow" className="w-4 h-4 text-gray-300 shrink-0 rotate-90 md:rotate-0" />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Self-hosted, you script and maintain every step. On the dbt platform it ships as a managed CI job.
      </p>
    </div>
  )
}

export default function CICD() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 03"
        title="CI/CD & environments"
        intro="Teams need a clean separation between where they develop and where production runs — and a safety net that checks every change before it merges. dbt supports this either way; the difference is how much of the pipeline you assemble yourself."
      />

      <TheJob>
        Test every proposed change in isolation before it reaches production, and promote it safely when
        it passes.
      </TheJob>

      <SplitCompare>
        <ComparePanel
          variant="core"
          title="Self-hosted dbt Core"
          subtitle="Environments and CI are yours to script and maintain."
        >
          <FeatureList
            variant="core"
            items={[
              { label: 'Define targets by hand', detail: 'dev and prod live as separate targets in profiles.yml' },
              { label: 'Build the CI pipeline', detail: 'a GitHub Actions or GitLab workflow that installs dbt and runs on each PR' },
              { label: 'Manage state for Slim CI', detail: 'download the production manifest so you can defer and build only what changed' },
              { label: 'Create and tear down schemas', detail: 'stand up a temporary schema per PR and clean it up afterward' },
            ]}
          />
          <CodeBlock title=".github/workflows/ci.yml">
{`on: [pull_request]
jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install dbt-snowflake
      - run: `}<span className="tok-c"># fetch prod manifest for --defer</span>{`
      - run: dbt build --select state:modified+ \\
               --defer --state ./prod-artifacts`}
          </CodeBlock>
        </ComparePanel>

        <ComparePanel
          variant="platform"
          title="dbt platform as control plane"
          subtitle="Managed environments with CI built in."
        >
          <FeatureList
            variant="platform"
            items={[
              { label: 'Managed environments', detail: 'development, staging, and production configured in the UI' },
              { label: 'CI jobs on every PR', detail: 'triggered automatically when a pull request opens or updates' },
              { label: 'Automatic deferral', detail: 'the platform tracks production state, so Slim CI builds only changes — no manifest wrangling' },
              { label: 'PR status checks', detail: 'pass/fail posts back to the pull request for the reviewer' },
            ]}
          />
          <CodeBlock title="dbt platform — CI configuration">
{`Environment:  Production  (deferred state source)
CI job:       runs on pull request
Command:      dbt build --select state:modified+
Behavior:     `}<span className="tok-fn">auto-defer</span>{` to prod · temp schema per PR
Result:       `}<span className="tok-str">"✓ checks passed"</span>{` on the PR
   `}<span className="tok-c"># no runners, no state files to manage</span>
          </CodeBlock>
        </ComparePanel>
      </SplitCompare>

      <PRFlow />

      <Takeaway>
        The concepts — environments, Slim CI, deferral — are the same in both worlds. Self-hosting means
        you build and maintain the pipeline, the runners, and the state plumbing behind them. The dbt
        platform delivers that pipeline as a managed capability, so reliable CI is a setting rather than a
        standing engineering commitment.
      </Takeaway>
    </div>
  )
}
