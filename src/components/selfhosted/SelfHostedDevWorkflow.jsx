import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodeBlock, Icon } from '../ui'

// Parallels the platform "Development process walkthrough" step-for-step, but
// shows how each step is actually done in a self-hosted dbt Core deployment.
const PHASES = [
  { id: 'develop', label: 'Develop' },
  { id: 'qa', label: 'QA' },
  { id: 'production', label: 'Production' },
]

const STEPS = {
  develop: [
    {
      title: 'Add your development credentials',
      platform: 'On the platform, an admin sets the connection once and every developer inherits it.',
      body: 'There is no central connection. Each developer hand-writes ~/.dbt/profiles.yml with their own dev schema and warehouse credentials — on every machine they work from.',
      code: (
        <CodeBlock title="~/.dbt/profiles.yml — edited by hand, per machine">
{`my_project:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: `}<span className="tok-str">"ab12345.us-east-1"</span>{`
      user: `}<span className="tok-str">"jdoe"</span>{`
      password: `}<span className="tok-str">{"\"{{ env_var('DBT_PW') }}\""}</span>{`
      schema: `}<span className="tok-str">"dbt_jdoe"</span>{`   `}<span className="tok-c"># your personal sandbox</span>
        </CodeBlock>
      ),
      catch: 'Onboarding or rotating credentials means touching every laptop — and one committed profiles.yml leaks secrets.',
    },
    {
      title: 'Set up locally & create a branch',
      platform: 'On the platform, you open the project in dbt Studio in the browser and branch with a click.',
      body: 'First you clone the repo, create a virtual environment, and install dbt Core plus the right adapter. Then you branch and verify your connection from the terminal — in your own local editor.',
      code: (
        <CodeBlock title="terminal">
{`$ python -m venv .venv && `}<span className="tok-kw">source</span>{` .venv/bin/activate
$ pip install dbt-core dbt-snowflake
$ git checkout -b `}<span className="tok-str">feature/orders-model</span>{`
$ dbt debug   `}<span className="tok-c"># confirm your local profile connects</span>
        </CodeBlock>
      ),
      catch: 'Your branch only works if your local toolchain matches everyone else’s — version drift is on you.',
    },
    {
      title: 'Commit & sync your changes',
      platform: 'On the platform, commit and sync are buttons in the IDE with visual change indicators.',
      body: 'You stage, commit, and push from the command line. There is no in-product git UI — you track what changed with git status.',
      code: (
        <CodeBlock title="terminal">
{`$ git add models/marts/fct_orders.sql
$ git commit -m `}<span className="tok-str">"add fct_orders mart"</span>{`
$ git push -u origin feature/orders-model`}
        </CodeBlock>
      ),
      catch: null,
    },
    {
      title: 'Open a pull request',
      platform: 'On the platform, opening a PR automatically triggers a dbt CI job — nothing to wire up.',
      body: 'You open the PR on GitHub or GitLab. Whether anything runs against it depends entirely on a CI workflow you have authored and maintain — dbt Core has no built-in CI.',
      code: null,
      catch: 'No CI exists until you build it. Until then, a PR is just a code diff with no data checks behind it.',
    },
  ],
  qa: [
    {
      title: 'A CI job spins up a schema',
      platform: 'On the platform, every PR automatically gets an isolated schema, created and torn down for you.',
      body: 'Your CI pipeline — GitHub Actions, GitLab CI, Azure Pipelines, whichever you run — is a workflow you author and maintain. It installs dbt, derives a unique schema name for the PR, and must reliably drop it afterward so runs never collide or leak warehouse cost.',
      code: (
        <CodeBlock title="CI config (GitHub Actions shown — GitLab CI etc. are equivalent)">
{`on: [pull_request]
env:
  DBT_SCHEMA: `}<span className="tok-str">{"\"ci_pr_${{ github.event.number }}\""}</span>{`
steps:
  - run: pip install dbt-snowflake
  - run: dbt build --target ci
  - `}<span className="tok-kw">if</span>{`: always()          `}<span className="tok-c"># you own teardown</span>{`
    run: `}<span className="tok-str">"drop schema if exists $DBT_SCHEMA cascade"</span>
        </CodeBlock>
      ),
      catch: 'The runner, the schema naming, and the cleanup are all yours to build and keep working.',
    },
    {
      title: 'Deferral + Slim CI: run only what changed',
      platform: 'On the platform, deferral to production state is automatic — Slim CI just works.',
      body: 'To build only modified models, CI needs the latest production manifest.json to compare against. No individual step here is hard — you stash the manifest in cloud storage or a CI artifact, pull it before each run, and re-upload the new one after every production deploy. The difficulty is that it is permanent, easy-to-get-subtly-wrong plumbing you own: three moving parts that must stay in sync on every run and every deploy, forever.',
      code: (
        <CodeBlock title="ci.yml — the state plumbing you own on every run + deploy">
{`# before CI: pull the last known-good prod manifest
- run: aws s3 cp s3://dbt-state/manifest.json ./prod/
- run: dbt build --select state:modified+ --defer --state ./prod
# after each PROD deploy: push the new manifest so next time is correct
- run: aws s3 cp target/manifest.json s3://dbt-state/manifest.json`}
        </CodeBlock>
      ),
      catch: 'If the stored manifest goes stale, Slim CI compares against the wrong baseline and silently builds the wrong set of models — no error, just incorrect results.',
    },
    {
      title: 'Data diffing',
      platform: 'On the platform, row-level data diffs surface in the PR so you see unintended changes.',
      body: 'dbt Core has no data diffing. You integrate a separate open-source tool (e.g. data-diff) or hand-write comparison queries between your dev schema and production — and wire the output into CI yourself.',
      code: (
        <CodeBlock title="an extra tool you install and run">
{`$ pip install data-diff
$ data-diff \\
    snowflake://prod/fct_orders \\
    snowflake://ci_pr_1234/fct_orders \\
    -k order_id   `}<span className="tok-c"># then parse + post results yourself</span>
        </CodeBlock>
      ),
      catch: 'Row-level diffing is a whole additional tool to install, run, and interpret on every PR.',
    },
    {
      title: 'Best-practice checks',
      platform: 'On the platform, project checks and lineage-aware validation are surfaced for you.',
      body: 'You run the dbt-project-evaluator package on demand, or lean on code review and team discipline. There is no automated best-practice surface in CI unless you assemble one.',
      code: (
        <CodeBlock title="run the evaluator yourself">
{`# packages.yml
packages:
  - package: dbt-labs/dbt_project_evaluator
    version: `}<span className="tok-str">"0.14.0"</span>{`
$ dbt build --select package:dbt_project_evaluator`}
        </CodeBlock>
      ),
      catch: null,
    },
    {
      title: 'Code review & merge',
      platform: 'On the platform, the reviewer sees the diff, the CI status, and the data diff together.',
      body: 'Review happens on your git provider like any code change. But the reviewer sees only the git diff — the CI result and any data diff are linked only if you built those integrations.',
      code: null,
      catch: 'Without wired-up status checks, "looks good" is a judgment on code, not on what the data actually did.',
    },
  ],
  production: [
    {
      title: 'Create a production job',
      platform: 'On the platform, a production job is a scheduled definition tied to a managed environment.',
      body: 'dbt Core has no concept of a job. You build one on an external orchestrator — containerize dbt, provision the runner, inject production credentials, define the schedule, and handle retries.',
      code: (
        <CodeBlock title="dags/dbt_daily.py — Airflow, hosted by you">
{`with DAG(`}<span className="tok-str">"dbt_daily"</span>{`, schedule=`}<span className="tok-str">"0 6 * * *"</span>{`):
    BashOperator(
        task_id=`}<span className="tok-str">"dbt_build"</span>{`,
        bash_command=`}<span className="tok-str">"dbt build --target prod"</span>{`,
    )
    `}<span className="tok-c"># + runner, secrets, retries, on-call…</span>
        </CodeBlock>
      ),
      catch: 'The scheduler and the compute it runs on are infrastructure you stand up, secure, and keep alive.',
    },
    {
      title: 'How a production run works',
      platform: 'On the platform, runs, logs, artifacts, and failure alerts are captured and retained for you.',
      body: 'Your scheduler triggers dbt build on your runner. Capturing logs, persisting run artifacts, and building the alert that tells someone it failed are all yours to operate — left alone, a failed run is silent.',
      code: null,
      catch: 'No alert fires unless you built one — the first sign of a broken run is often a stale dashboard.',
    },
  ],
}

export default function SelfHostedDevWorkflow() {
  const [phase, setPhase] = useState('develop')
  const [step, setStep] = useState(0)

  const steps = STEPS[phase]
  const current = steps[step]
  const phaseLabel = PHASES.find(p => p.id === phase).label

  const switchPhase = id => { setPhase(id); setStep(0) }

  return (
    <div className="w-full space-y-5">
      {/* Phase tabs */}
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

      {/* Step tabs */}
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

      {/* Content */}
      <motion.div key={`${phase}-${step}`}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          {phaseLabel} · Step {step + 1}
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
