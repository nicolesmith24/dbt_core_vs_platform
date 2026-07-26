import AnswerCompare from './AnswerCompare'

// AI tab: the ARR / board-trust question (deck slide 42).
export default function AgentGrounding() {
  return (
    <div className="mb-8">
      <AnswerCompare
        eyebrow="Ask an AI agent a board-level question"
        question="“What's our ARR this quarter — and can I trust it enough to share with the board?”"
        self={{
          time: '45–90 min', trust: 'uncertain', label: 'The agent has to',
          items: [
            'Parse run_results.json from S3',
            'Check the orchestrator for the last successful run',
            'Manually trace upstream model dependencies',
            'Cross-reference sources.yml for freshness',
            'Compile the evidence and relay it to the stakeholder',
          ],
        }}
        platform={{
          time: 'real-time', trust: 'certified', label: 'The agent returns',
          items: [
            'ARR value from a governed metric definition',
            'Tests passed · 2h ago',
            'Source data fresh · 6h ago',
            'Certified · ready_for_ai',
            'No pipeline failures in 7 days',
          ],
        }}
        footer="Same agent, same question. The difference is whether the context it needs — metrics, freshness, tests, lineage — is a governed API call or a manual archaeology project."
      />
    </div>
  )
}
