# dbt Core vs. the dbt platform — a field guide

An interactive walkthrough that contrasts self-hosting **dbt Core** (the open source
transformation engine) with running the **dbt platform** as a control plane around it.
It covers four everyday jobs a data team faces:

1. **Develop** — local toolchain vs. dbt Studio, dbt Copilot, and dbt Canvas
2. **Orchestrate** — a self-built scheduler stack vs. managed jobs with state-aware orchestration
3. **CI/CD & environments** — hand-rolled pipelines and Slim CI vs. managed environments and CI
4. **Discover & govern** — static docs vs. the live Catalog, column-level lineage, dbt Mesh, and contracts

Built with React, Vite, Tailwind CSS v4, and Framer Motion — the same stack as the
[dbt fundamentals walkthrough](https://mfreeborndbt.github.io/dbt_101_walkthrough_guide/) it extends.

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

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

The Vite `base` is set to `./` (relative), so the site works from any project path,
e.g. `https://<user>.github.io/<repo>/`.

---

dbt Core is open source under the Apache 2.0 license. The dbt platform is a commercial product from dbt Labs.
