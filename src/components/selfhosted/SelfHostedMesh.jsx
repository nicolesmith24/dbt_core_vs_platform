import SelfHostedWalkthrough from './SelfHostedWalkthrough'
import { CodeBlock } from '../ui'
import { MeshSharingDiagram, LineageBoundaryDiagram } from '../viz/MeshDiagrams'

const sections = [
  {
    key: 'sharing',
    label: 'Sharing across teams',
    title: 'There is no clean way to share models across teams',
    body: 'This is the heart of it: dbt Core has no governed way to reference another team’s project. You are left with two bad options — one giant monolith repo where every team works on top of each other with no ownership boundaries, or importing another team’s entire project as a raw git package with no versioning, no access control, and no stability guarantees. Neither is a real mesh, and both get worse as you add teams.',
    code: <MeshSharingDiagram />,
    platform: 'dbt Mesh: governed cross-project ref() with clear ownership, access, and versioned public models.',
    catch: 'This gap is one of the top reasons teams move to the dbt platform to build data products and scale across teams.',
  },
  {
    key: 'discovery',
    label: 'Model discovery',
    title: 'At scale, no one can find — or trust — what already exists',
    body: 'With no catalog, discovery is grep and tribal knowledge. Across dozens of teams and hundreds of models the same metric gets built five different ways and nobody can tell which to trust. And if you run an enterprise catalog like Alation, Atlan, or Collibra, populating it from dbt Core means building and maintaining your own metadata pipeline from manifest.json and catalog.json — those tools integrate natively with the dbt platform through its Discovery/Metadata API.',
    code: (
      <CodeBlock title="discovery, at scale">
{`$ grep -rl "revenue" models/     `}<span className="tok-c"># which of the 12 matches is the real one?</span>{`
$ `}<span className="tok-c"># ask in Slack, get three different answers, build a sixth version</span>{`
$ `}<span className="tok-c"># to feed Alation/Atlan: hand-build an ingest from manifest.json</span>
      </CodeBlock>
    ),
    platform: 'A searchable Catalog spans every project, and enterprise catalogs (Alation, Atlan, Collibra) sync natively through the Discovery/Metadata API.',
    catch: 'With no API over your project, every downstream tool — including your data catalog — is a custom integration you build and host.',
  },
  {
    key: 'lineage',
    label: 'Cross-project lineage',
    title: 'Lineage stops dead at your project boundary',
    body: 'dbt docs generate gives you a static, single-project graph with no column-level detail. It cannot show how another team’s project depends on yours — so no one can see the blast radius of a change that crosses teams. At the scale where that matters most, you are flying blind.',
    code: <LineageBoundaryDiagram />,
    platform: 'Live, column-level lineage across every project — in the UI and via the Discovery/Metadata API.',
    catch: 'You cannot see cross-team impact — the exact question that decides whether a change is safe at scale.',
  },
  {
    key: 'governance',
    label: 'Governance at scale',
    title: 'Governance that stops at the project boundary',
    body: 'dbt Core genuinely has model contracts, versions, groups, and access — and inside a single project they work: a contract fails the build if a model breaks its schema. What Core cannot do is span projects. Nothing signals that breaking change to a separate team’s project, coordinates ownership across teams, or guarantees a public interface stays stable for consumers you cannot see.',
    code: (
      <CodeBlock title="a contract exists in config — but only inside one project">
{`models:
  - name: fct_orders
    `}<span className="tok-kw">config</span>{`:
      contract: {enforced: `}<span className="tok-num">true</span>{`}
   `}<span className="tok-c"># catches schema drift in YOUR project, on YOUR next run —</span>{`
   `}<span className="tok-c"># nothing protects the downstream teams depending on it</span>
      </CodeBlock>
    ),
    platform: 'The same contracts, versions, groups, and access are governed and enforced across projects.',
    catch: 'By the time you are serving data products to other teams, in-project governance no longer reaches far enough.',
  },
]

export default function SelfHostedMesh() {
  return <SelfHostedWalkthrough sections={sections} eyebrow="Self-hosted dbt Core" />
}
