# dbt Core vs. the dbt platform

An interactive walkthrough that contrasts self-hosting **dbt Core** (the open source
transformation engine) with running the **dbt platform** as a control plane around it.
It covers four everyday jobs a data team faces:

1. **Develop** — local toolchain vs. dbt Studio, dbt Copilot, and dbt Canvas
2. **Orchestrate** — a self-built scheduler stack vs. managed jobs with state-aware orchestration
3. **CI/CD & environments** — hand-rolled pipelines and Slim CI vs. managed environments and CI
4. **Discover & govern** — static docs vs. the live Catalog, column-level lineage, dbt Mesh, and contracts

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```


dbt Core is open source under the Apache 2.0 license. The dbt platform is a commercial product from dbt Labs.
