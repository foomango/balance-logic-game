import { useState } from 'react'
import type { ExplainStep } from '../types'
import Scale from './Scale'

interface Props {
  steps: ExplainStep[]
  onClose: () => void
}

/**
 * Animated "Show me why" panel. Walks through the worked solution one step at
 * a time, mirroring the hand-drawn explanations in the AAP test images. Each
 * step has a plain-language caption and an optional little scale to look at.
 */
export default function ExplainPanel({ steps, onClose }: Props) {
  const [i, setI] = useState(0)
  const step = steps[i]
  const isLast = i === steps.length - 1

  return (
    <div className="explain-overlay" role="dialog" aria-modal="true">
      <div className="explain-panel">
        <div className="explain-header">
          <span className="explain-title">Let's figure it out 🧠</span>
          <button className="explain-close" onClick={onClose} type="button" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="explain-step-count">
          Step {i + 1} of {steps.length}
        </div>

        <div className={`explain-body ${step.isFact ? 'is-fact' : ''}`}>
          {step.isFact && <div className="explain-fact-tag">We know this</div>}
          {step.scale && (
            <div className="explain-scale">
              <Scale left={step.scale.left} right={step.scale.right} mode="level" size={0.95} />
            </div>
          )}
          <p className="explain-caption">{step.caption}</p>
        </div>

        <div className="explain-nav">
          <button
            className="btn-secondary"
            type="button"
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
          >
            ← Back
          </button>
          {isLast ? (
            <button className="btn-primary" type="button" onClick={onClose}>
              Got it!
            </button>
          ) : (
            <button className="btn-primary" type="button" onClick={() => setI((v) => v + 1)}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
