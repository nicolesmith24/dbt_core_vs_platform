import { motion } from 'framer-motion'
import { ModuleHeader, TheJob, SplitCompare, ComparePanel, FeatureList, CodeBlock, Takeaway, Icon } from '../ui'

function StackDiagram() {
  const diy = ['Scheduler (Airflow / Dagster / cron)', 'Container image + runner infra', 'Secrets & credential store', 'Artifact storage (manifest, run results)', 'Logging, retries & alerting']
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Self-hosted: a stack you assemble</div>
        <div className="space-y-2">
          {diy.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
            >
              <Icon name="wrench" className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Five moving parts you build, secure, and keep running.</p>
      </div>

      <div className="rounded-2xl border border-orange-200 ring-1 ring-orange-100 bg-white p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-4">dbt platform: one control plane</div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="clock" className="w-4 h-4 text-orange-300" />
            <span className="font-semibold text-sm">Jobs & scheduler</span>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            {['Managed runners — no infra', 'State-aware orchestration', 'Run history, logs & artifacts', 'Built-in alerting'].map(x => (
              <li key={x} className="flex items-center gap-2">
                <Icon name="check" className="w-3.5 h-3.5 text-orange-300 shrink-0" />{x}
              </li>
            ))}
          </ul>
        </motion.div>
        <p className="text-xs text-gray-400 mt-4">One integrated service, nothing to host.</p>
      </div>
    </div>
  )
}

export default function Orchestrate() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 02"
        title="Orchestrating runs"
        intro="dbt Core runs your project when you type a command. Production needs more than that: a schedule, a place to run, and a way to know when something breaks. That orchestration layer is the single biggest thing you take on when you self-host."
      />

      <TheJob>
        Run the right models, in the right order, on a schedule — and know immediately when a run fails.
      </TheJob>

      <SplitCompare>
        <ComparePanel
          variant="core"
          title="Self-hosted dbt Core"
          subtitle="dbt Core has no scheduler — you supply one."
        >
          <FeatureList
            variant="core"
            items={[
              { label: 'Choose and run a scheduler', detail: 'Airflow, Dagster, or cron that you stand up and maintain' },
              { label: 'Containerize dbt', detail: 'build an image and provision compute for it to run on' },
              { label: 'Persist artifacts yourself', detail: 'store manifest.json and run_results.json somewhere durable' },
              { label: 'Wire up retries and alerts', detail: 'failures surface only if you build the notifications' },
            ]}
          />
          <CodeBlock title="Airflow DAG — the part you own">
{`from airflow import DAG
from airflow.operators.bash import BashOperator

`}<span className="tok-kw">with</span>{` DAG(`}<span className="tok-str">"dbt_daily"</span>{`, schedule=`}<span className="tok-str">"0 6 * * *"</span>{`) `}<span className="tok-kw">as</span>{` dag:
    run = BashOperator(
        task_id=`}<span className="tok-str">"dbt_build"</span>{`,
        bash_command=`}<span className="tok-str">"dbt build --target prod"</span>{`,
    )
    `}<span className="tok-c"># + retries, secrets, logging, alerting…</span>
          </CodeBlock>
        </ComparePanel>

        <ComparePanel
          variant="platform"
          title="dbt platform as control plane"
          subtitle="Scheduling and run infrastructure are built in."
        >
          <FeatureList
            variant="platform"
            items={[
              { label: 'Jobs with a scheduler', detail: 'define a job, pick a cadence or trigger — runners are managed for you' },
              { label: 'State-aware orchestration', detail: 'the platform builds only what changed and its downstream, cutting warehouse spend' },
              { label: 'Run history and logs', detail: 'every run, its artifacts, and full logs are retained and searchable' },
              { label: 'Alerting included', detail: 'failures notify email, Slack, or a webhook out of the box' },
            ]}
          />
          <CodeBlock title="dbt platform — a job definition">
{`Job:  Daily production build
Trigger:  schedule · `}<span className="tok-str">"0 6 * * *"</span>{`
Command:  dbt build
Options:  `}<span className="tok-fn">state-aware</span>{` (build modified + downstream)
Alerts:   on failure → #data-alerts
   `}<span className="tok-c"># runners, artifacts & logs are managed</span>
          </CodeBlock>
        </ComparePanel>
      </SplitCompare>

      <StackDiagram />

      <Takeaway>
        Orchestration is where self-hosting quietly turns into a platform engineering project: a scheduler,
        runners, secrets, artifact storage, and alerting all become yours to run. The dbt platform folds
        those into one managed control plane, and state-aware orchestration means you only pay to rebuild
        what actually changed.
      </Takeaway>
    </div>
  )
}
