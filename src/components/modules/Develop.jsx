import { ModuleHeader, TheJob, SplitCompare, ComparePanel, FeatureList, CodeBlock, Takeaway } from '../ui'

export default function Develop() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 01"
        title="Developing models"
        intro="Every dbt project starts the same way: an analytics engineer writes a model, previews the result, and iterates. What differs is everything around that loop — how the environment gets set up, how fast a new teammate can contribute, and how much help they get while writing SQL."
      />

      <TheJob>
        Get an analytics engineer from a fresh laptop to a previewed, tested model — and keep that loop
        fast as the team grows.
      </TheJob>

      <SplitCompare>
        <ComparePanel
          variant="core"
          title="Self-hosted dbt Core"
          subtitle="A local toolchain each developer installs and maintains."
        >
          <FeatureList
            variant="core"
            items={[
              { label: 'Install locally', detail: 'Python, a virtual environment, dbt Core, and the right warehouse adapter on every machine' },
              { label: 'Manage credentials', detail: 'each developer keeps a profiles.yml with their own warehouse connection' },
              { label: 'Bring your own editor', detail: 'VS Code plus community extensions for SQL and Jinja' },
              { label: 'Run from the CLI', detail: 'dbt run / dbt build in a terminal, results previewed by hand' },
              { label: 'Onboarding is a runbook', detail: 'each new hire repeats the full setup before their first model' },
            ]}
          />
          <CodeBlock title="terminal — first-time setup">
{`$ python -m venv .venv && `}<span className="tok-kw">source</span>{` .venv/bin/activate
$ pip install dbt-core dbt-snowflake
$ `}<span className="tok-c"># hand-edit ~/.dbt/profiles.yml with warehouse creds</span>{`
$ dbt debug   `}<span className="tok-c"># ...repeat on every laptop</span>{`
$ dbt run --select stg_orders`}
          </CodeBlock>
        </ComparePanel>

        <ComparePanel
          variant="platform"
          title="dbt platform as control plane"
          subtitle="A managed development experience in the browser."
        >
          <FeatureList
            variant="platform"
            items={[
              { label: 'dbt Studio in the browser', detail: 'a full IDE with nothing to install — open a project and start building' },
              { label: 'Managed connections', detail: 'warehouse credentials configured once by an admin, inherited by every developer' },
              { label: 'dbt Copilot', detail: 'AI generates models, tests, and documentation from a prompt or existing SQL' },
              { label: 'dbt Canvas', detail: 'a visual, drag-and-drop way to build and edit models alongside the code' },
              { label: 'Onboarding is a login', detail: 'a new analytics engineer is productive on day one' },
            ]}
          />
          <CodeBlock title="dbt Studio — first-time setup">
{`1. `}<span className="tok-fn">Log in</span>{` to the dbt platform
2. `}<span className="tok-fn">Open</span>{` the project — IDE loads in the browser
3. `}<span className="tok-fn">Build</span>{` a model (or ask dbt Copilot to draft it)
   `}<span className="tok-c"># no venv, no adapter install, no local creds</span>
          </CodeBlock>
        </ComparePanel>
      </SplitCompare>

      <Takeaway>
        Self-hosting keeps development on each engineer's laptop, so every setup — and every new hire — is
        yours to support. The dbt platform moves that loop into a shared, browser-based workspace with AI
        assistance built in, so teams spend their time modeling data instead of maintaining toolchains.
      </Takeaway>
    </div>
  )
}
