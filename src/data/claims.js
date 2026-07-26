// Single source of truth for sourced proof points, customer stories, and the
// ownership ledger. Every numeric claim here is dbt-published; keep the `source`
// link accurate so the UI can attribute it honestly. Reference the current
// product, dbt State, only — not the older discontinued orchestration product it
// replaced. Some source titles still contain "dbt Cloud" (older name) — those are
// real published titles kept verbatim in citations only.

export const sources = {
  // Product-mechanism claims (attach to the simulators)
  fusion: {
    title: 'Accelerate data workflows with the dbt Fusion engine',
    url: 'https://www.getdbt.com/product/fusion',
  },
  versions: {
    title: 'About dbt versions',
    url: 'https://docs.getdbt.com/docs/dbt-versions',
  },
  howWeThink: {
    title: 'How we think about dbt Core and dbt Cloud',
    url: 'https://www.getdbt.com/blog/how-we-think-about-dbt-core-and-dbt-cloud',
  },
  pricing: {
    title: 'dbt pricing',
    url: 'https://www.getdbt.com/pricing',
  },
  // Customer stories
  whoop: { title: 'WHOOP customer story', url: 'https://www.getdbt.com/case-studies/whoop' },
  sunrun: { title: 'Sunrun customer story', url: 'https://www.getdbt.com/case-studies/sunrun' },
  axs: { title: 'AXS customer story', url: 'https://www.getdbt.com/case-studies/axs' },
  plentific: { title: 'Plentific customer story', url: 'https://www.getdbt.com/case-studies/plentific' },
  dish: { title: 'DISH Digital Solutions customer story', url: 'https://www.getdbt.com/case-studies/dish-digital-solutions' },
  enpal: { title: 'Enpal customer story', url: 'https://www.getdbt.com/case-studies/enpal' },
  rebtel: { title: 'Rebtel customer story', url: 'https://www.getdbt.com/case-studies/rebtel' },
}

// Product-mechanism proof points — rendered by <ProofPoint> with a "dbt-published" label.
export const proofPoints = {
  fusionSpeed: {
    stat: 'up to 30×',
    label: 'faster parsing of a 10,000-model project than dbt Core',
    source: sources.fusion,
  },
}

// Named customer outcomes — rendered by <CustomerProof>. `note` carries an honest
// attribution caveat where the result is bundled with a broader migration.
export const customers = {
  whoopHours: { name: 'WHOOP', stat: '32+ hrs/mo', label: 'saved resolving data errors and issues', source: sources.whoop },
  whoopDocs: { name: 'WHOOP', stat: '99%', label: 'documentation coverage across the project', source: sources.whoop },
  sunrunTickets: { name: 'Sunrun', stat: '50%', label: 'fewer engineering tickets to diagnose and resolve data issues', source: sources.sunrun },
  sunrunDeploy: { name: 'Sunrun', stat: '75%', label: 'faster time to deployment', source: sources.sunrun },
  axsDeploy: { name: 'AXS', stat: '50%', label: 'faster to deploy new models', source: sources.axs },
  axsMaintenance: { name: 'AXS', stat: '40%', label: 'fewer work hours spent on maintenance', source: sources.axs },
  axsTroubleshoot: { name: 'AXS', stat: '10%', label: 'faster troubleshooting using the lineage graph', source: sources.axs },
  plentificBreaks: { name: 'Plentific', stat: '99%', label: 'decline in data pipeline breaks after automated end-to-end testing', source: sources.plentific },
  dishBugs: { name: 'DISH Digital', stat: '30%', label: 'fewer bugs with improved data quality', source: sources.dish },
  dishTroubleshoot: { name: 'DISH Digital', stat: '15%', label: 'less time spent troubleshooting with faster root-cause analysis', source: sources.dish },
  enpalCost: { name: 'Enpal', stat: '70%', label: 'lower monthly data costs', note: 'as part of a modern data stack migration onto the dbt platform', source: sources.enpal },
  enpalRefresh: { name: 'Enpal', stat: '36h → 1h', label: 'faster refresh on their heaviest pipelines', note: 'includes a warehouse migration', source: sources.enpal },
  rebtelMaintenance: { name: 'Rebtel', stat: '4 weeks/yr', label: 'of data-team maintenance time reclaimed', source: sources.rebtel },
}

// Ownership ledger — the operational components you run yourself when self-hosting.
// Each item spells out the real work (`work`) so the burden is concrete, and the
// one-line platform equivalent (`platform`). On the dbt platform each is managed
// for you. Keyed by walkthrough topic.
export const ledger = {
  development: [
    {
      label: 'Local dev environment',
      work: 'Install Python, a virtual environment, dbt Core, and the correct warehouse adapter on every machine — then keep versions aligned across a growing team and a mix of operating systems.',
      platform: 'dbt Studio runs in the browser — nothing to install or align.',
    },
    {
      label: 'Warehouse credentials',
      work: 'Hand out and rotate a connection profile for every developer, and police the risk of someone committing a profiles.yml full of secrets.',
      platform: 'Connections configured once by an admin, inherited by everyone.',
    },
    {
      label: 'CI pipeline',
      work: 'Author and maintain a GitHub Actions or GitLab workflow that installs dbt and runs on every pull request — and keep it green as the project evolves.',
      platform: 'CI jobs run on every PR with no workflow to maintain.',
    },
    {
      label: 'Ephemeral schemas',
      work: 'Create an isolated schema for each pull request and reliably tear it down afterward, so test runs never collide or quietly rack up warehouse cost.',
      platform: 'Temporary schemas created and cleaned up automatically.',
    },
    {
      label: 'Slim CI state & deferral',
      work: 'Fetch and store the production manifest so CI can defer and build only what changed — and keep that state artifact fresh on every deploy.',
      platform: 'Deferral to production state is automatic.',
    },
    {
      label: 'dbt version upgrades',
      work: 'Pin a dbt version, test each upgrade, coordinate the whole team, and chase version drift across every laptop and CI runner.',
      platform: 'Automatic upgrades / release tracks keep everyone current.',
    },
  ],
  orchestration: [
    {
      label: 'Scheduler',
      work: 'Stand up and host Airflow, Dagster, or cron; author and maintain the DAGs that invoke dbt; and carry an on-call rotation for when the scheduler itself falls over overnight.',
      platform: 'Define a job and a cadence — the scheduler is fully managed.',
    },
    {
      label: 'Runner infrastructure',
      work: 'Build a dbt container image, provision and scale the compute it runs on, and keep it patched and secure as it ages.',
      platform: 'Managed runners — no image or compute to operate.',
    },
    {
      label: 'Secrets & credentials',
      work: 'Run a secrets store, inject warehouse credentials securely into every run, and rotate them without breaking production jobs.',
      platform: 'Credentials stored and injected by the platform.',
    },
    {
      label: 'Artifact storage',
      work: 'Persist manifest.json and run_results.json somewhere durable after every run, or lose the state and history everything else depends on.',
      platform: 'Artifacts retained automatically for every run.',
    },
    {
      label: 'Retries, logging & alerting',
      work: 'Build retry logic, ship logs to a central store, and construct the alerts that tell a human a job failed — none of it exists out of the box.',
      platform: 'Retries, centralized logs, and failure alerts are built in.',
    },
    {
      label: 'Run history & monitoring',
      work: 'Store and index past runs, then build freshness and timing dashboards from raw artifacts just to know whether anything is quietly degrading.',
      platform: 'Full run history, timing, and freshness surfaced automatically.',
    },
    {
      label: 'Compute cost visibility',
      work: 'dbt Core gives you no view of what your runs cost. To manage the warehouse bill you build your own cost monitoring on top of query history — and there is no dbt State to trim it.',
      platform: 'Model-level cost insight, and dbt State cuts the bill by rebuilding only what changed.',
    },
  ],
  mesh: [
    {
      label: 'Model discovery',
      work: 'Without a catalog, finding whether a model already exists means grepping the repo or asking in Slack — duplication creeps in as the project grows.',
      platform: 'A searchable Catalog of every model, owner, and column.',
    },
    {
      label: 'Docs hosting',
      work: 'Run dbt docs generate, host the static site on S3 or Netlify, and re-publish it on every change — or watch it drift out of date.',
      platform: 'An always-current Catalog, with nothing to host.',
    },
    {
      label: 'Cross-project coordination',
      work: 'Share models across teams by convention, copied packages, or a single monolith repo — there is no governed way to reference another project.',
      platform: 'dbt Mesh governs cross-project references and ownership.',
    },
    {
      label: 'Lineage upkeep',
      work: 'Regenerate lineage on every change; even then it is a point-in-time snapshot with no column-level detail that stops at your project boundary.',
      platform: 'Live, column-level lineage that spans projects.',
    },
    {
      label: 'Breaking-change protection',
      work: 'Nothing warns a downstream team when you change a shared model — you find out when their dashboard breaks.',
      platform: 'Model contracts and versions block breaking changes before merge.',
    },
  ],
  semantic: [
    {
      label: 'Metric definitions',
      work: 'The same metric (revenue, active users) gets re-implemented in every BI tool, notebook, and dashboard — and the numbers drift apart over time.',
      platform: 'Metrics defined once in the Semantic Layer, consumed everywhere.',
    },
    {
      label: 'A serving API',
      work: 'dbt Core can define metrics with MetricFlow, but there is no running service to query them — so nothing downstream can actually call them.',
      platform: 'A governed API and native connectors serve metrics on demand.',
    },
    {
      label: 'Consistency policing',
      work: 'With no single source of truth, someone has to reconcile why finance and marketing report different revenue every quarter.',
      platform: 'One governed definition means one answer, everywhere.',
    },
    {
      label: 'Access for apps & agents',
      work: 'Any BI tool, app, or LLM that needs a metric has to reach into the warehouse and re-derive it — there is no trusted endpoint to ask.',
      platform: 'BI tools, apps, and AI query the Semantic Layer directly.',
    },
  ],
  ai: [
    {
      label: 'Trusted context for agents',
      work: 'An AI agent pointed at raw SQL has no model descriptions, tests, or lineage to ground it — so it guesses at table meanings and hallucinates joins.',
      platform: 'The MCP server exposes governed models, metrics, and lineage as context.',
    },
    {
      label: 'Governed context behind the MCP server',
      work: 'The dbt MCP server is open source and runs against dbt Core, but the context that grounds an agent — governed metrics, catalog, and lineage — comes from the Semantic Layer and Discovery APIs that dbt Core does not run. You would build and host that context layer yourself.',
      platform: 'The MCP server is backed by governed metrics, catalog, and lineage.',
    },
    {
      label: 'Metadata APIs & column lineage',
      work: 'There is no API over your project — tools and agents get raw manifest.json / catalog.json to parse, and column-level lineage has to be assembled by hand. Every integration is a parser you build and host.',
      platform: 'Discovery/Metadata and Semantic Layer APIs expose governed metadata and column-level lineage directly.',
    },
    {
      label: 'In-product AI assistance',
      work: 'There is no built-in assistant; generating models, tests, or docs is entirely manual, or a bespoke tool you build and maintain.',
      platform: 'dbt Wizard drafts models, tests, and documentation in-product.',
    },
  ],
  security: [
    {
      label: 'Role-based access control',
      work: 'dbt Core has no concept of roles. Access stops at warehouse grants — anyone with repo access can edit or run any model. Finer-grained, dbt-level or environment-level permissions must be built outside dbt.',
      platform: 'RBAC governs who can develop, run, and deploy — per project and environment.',
    },
    {
      label: 'SSO / SAML authentication',
      work: 'Every surface you host — the Airflow UI, the docs site, any internal tool — is its own authentication problem to wire up to your identity provider.',
      platform: 'SSO / SAML through your IdP, configured once for everyone.',
    },
    {
      label: 'Audit logging',
      work: 'There is no record of who changed a model or triggered a run. You reconstruct it from git history and warehouse query logs — which rarely satisfies a security or compliance review.',
      platform: 'A built-in audit log of who did what, when.',
    },
    {
      label: 'Security patching',
      work: 'You patch and upgrade the entire self-hosted stack — dbt, adapters, Airflow, Python, and the OS underneath — to stay ahead of vulnerabilities.',
      platform: 'The platform is patched and maintained for you.',
    },
    {
      label: 'Support & SLAs',
      work: 'Support is the community and your own team. When production breaks at 2am, there is no vendor to escalate to and no SLA behind the fix.',
      platform: 'Enterprise support and SLAs stand behind the platform.',
    },
  ],
}

// Total components you operate yourself across every module — the running tally.
export const totalOwnedComponents = Object.values(ledger)
  .reduce((sum, items) => sum + items.length, 0)

export const moduleOrder = ['development', 'orchestration', 'mesh', 'semantic', 'ai', 'security']
