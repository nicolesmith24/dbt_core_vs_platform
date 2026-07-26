import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodeBlock, Icon } from '../ui'

// Self-hosted orchestration = a real setup guide. Two phases, each a sequence of
// concrete steps with the actual configuration you'd write. No Phase 3 — dbt
// State is a platform capability, not something dbt Core does.
const PHASES = [
  { id: 'orchestrate', label: 'Phase 1: Scheduling & orchestration' },
  { id: 'testing', label: 'Phase 2: Testing automation' },
]

const STEPS = {
  orchestrate: [
    {
      title: 'Containerize dbt and provision a runner',
      body: 'dbt Core has no scheduler and no compute of its own. Before anything can run on a schedule, you package dbt into an image and provision somewhere for it to run (ECS, Kubernetes, a VM) — then keep it patched.',
      code: (
        <CodeBlock title="Dockerfile">
{`FROM python:3.11-slim
RUN pip install dbt-core dbt-snowflake
COPY . /usr/app
WORKDIR /usr/app
ENTRYPOINT ["dbt"]`}
        </CodeBlock>
      ),
      platform: 'Managed runners execute your jobs — there is no image or compute to operate.',
      catch: 'This image and the infrastructure it runs on are yours to build, scale, and secure.',
    },
    {
      title: 'Manage and inject credentials',
      body: 'The runner needs production warehouse credentials, injected securely at runtime. You stand up a secrets store (or Airflow Connections / Vault) and reference it from profiles.yml — which must never be committed with secrets in it.',
      code: (
        <CodeBlock title="profiles.yml — env vars resolved from your secrets store">
{`my_project:
  target: prod
  outputs:
    prod:
      type: snowflake
      account: `}<span className="tok-str">{"\"{{ env_var('SF_ACCOUNT') }}\""}</span>{`
      user: `}<span className="tok-str">{"\"{{ env_var('SF_USER') }}\""}</span>{`
      password: `}<span className="tok-str">{"\"{{ env_var('SF_PASSWORD') }}\""}</span>{`
      schema: analytics`}
        </CodeBlock>
      ),
      platform: 'Credentials are stored and injected by the platform.',
      catch: 'Rotating a secret means updating the store and every runner that reads it — without breaking a run.',
    },
    {
      title: 'Write the orchestration DAG',
      body: 'Now the actual scheduling. dbt derives the model order from ref(), but something has to decide when the build runs and on what infrastructure. Self-hosted, that is an Airflow DAG (or Dagster / cron) you author and maintain.',
      code: (
        <CodeBlock title="dags/dbt_prod.py — Airflow">
{`from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id=`}<span className="tok-str">"dbt_prod"</span>{`,
    schedule=`}<span className="tok-str">"0 6 * * *"</span>{`,
    start_date=datetime(2024, 1, 1),
    catchup=False,
) as dag:
    dbt_build = BashOperator(
        task_id=`}<span className="tok-str">"dbt_build"</span>{`,
        bash_command=`}<span className="tok-str">"dbt build --target prod"</span>{`,
    )`}
        </CodeBlock>
      ),
      platform: 'Define a job, pick a schedule or trigger — the scheduler is fully managed.',
      catch: 'You also own the Airflow deployment itself: its metadata database, scheduler, web server, and upgrades.',
    },
    {
      title: 'Add retries, logging, and alerting',
      body: 'A production run has to recover from transient failures, keep its logs somewhere durable, and tell a human when it breaks. None of that exists until you configure it.',
      code: (
        <CodeBlock title="default_args + failure hook">
{`default_args = {
    `}<span className="tok-str">"retries"</span>{`: 2,
    `}<span className="tok-str">"retry_delay"</span>{`: timedelta(minutes=5),
    `}<span className="tok-str">"on_failure_callback"</span>{`: notify_slack,  `}<span className="tok-c"># you write notify_slack()</span>{`
}
`}<span className="tok-c"># + ship task logs to S3/CloudWatch and retain run_results.json</span>
        </CodeBlock>
      ),
      platform: 'Retries, centralized logs, and failure alerts are built in.',
      catch: 'Left unconfigured, a failed run is silent — the first signal is a stale dashboard the next morning.',
    },
  ],
  testing: [
    {
      title: 'Declare your tests',
      body: 'Tests are pure dbt Core — you add them in YAML alongside your models. This step is identical to the platform.',
      code: (
        <CodeBlock title="models/marts/_marts.yml">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        `}<span className="tok-kw">tests</span>{`: [not_null, unique]
      - name: customer_id
        `}<span className="tok-kw">tests</span>{`:
          - relationships:
              to: `}<span className="tok-str">{"ref('stg_customers')"}</span>{`
              field: customer_id`}
        </CodeBlock>
      ),
      platform: 'Identical — tests are a dbt Core feature.',
      catch: null,
    },
    {
      title: 'Run them as part of the build',
      body: 'dbt build runs each model, then its tests, and skips downstream models if a test fails. You tune severity and thresholds in config. Also identical — until a test actually fails.',
      code: (
        <CodeBlock title="tuning a test">
{`- name: order_total
  tests:
    - not_null:
        config:
          severity: `}<span className="tok-str">warn</span>{`      `}<span className="tok-c"># warn vs error</span>{`
          error_if: `}<span className="tok-str">{"\">1000\""}</span>{`
          warn_if: `}<span className="tok-str">{"\">0\""}</span>
        </CodeBlock>
      ),
      platform: 'Identical mechanics — but running it on a schedule still relies on the orchestration you built in Phase 1.',
      catch: null,
    },
    {
      title: 'Capture and act on failures',
      body: 'This is where self-hosting reappears. dbt writes results to run_results.json and can store failing rows, but surfacing them, alerting on them, and tracking them over time is all on you.',
      code: (
        <CodeBlock title="dbt_project.yml + your pipeline glue">
{`# dbt_project.yml
tests:
  +store_failures: `}<span className="tok-num">true</span>{`   `}<span className="tok-c"># failing rows land in a table you monitor</span>{`

# then, in your orchestration:
#   parse target/run_results.json,
#   post failures to Slack, and retain the history yourself`}
        </CodeBlock>
      ),
      platform: 'Failures surface with full run history and alerts — no plumbing required.',
      catch: 'Being told a test failed is the piece dbt Core does not hand you; you build the alerting.',
    },
  ],
}

export default function SelfHostedOrchestration() {
  const [phase, setPhase] = useState('orchestrate')
  const [step, setStep] = useState(0)

  const steps = STEPS[phase]
  const current = steps[step]
  const phaseLabel = PHASES.find(p => p.id === phase).label

  const switchPhase = id => { setPhase(id); setStep(0) }

  return (
    <div className="w-full space-y-5">
      <div className="flex gap-2 flex-wrap">
        {PHASES.map(p => (
          <button key={p.id} onClick={() => switchPhase(p.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
              p.id === phase ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              i === step ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            Step {i + 1}
          </button>
        ))}
      </div>

      <motion.div key={`${phase}-${step}`}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          {phaseLabel.replace(/^Phase \d+: /, '')} · Step {step + 1} of {steps.length}
        </div>
        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{current.title}</h4>
        <p className="text-gray-600 leading-relaxed">{current.body}</p>

        {current.code && current.code}

        <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
          <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
          <span><span className="font-medium text-gray-700">On the dbt platform:</span> {current.platform}</span>
        </div>

        {current.catch && (
          <div className="mt-3 flex items-start gap-2 text-sm rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-amber-800">
            <Icon name="alert" className="w-4 h-4 shrink-0 mt-0.5" />
            <span><span className="font-semibold">The catch:</span> {current.catch}</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
