import { useState } from 'react'
import type { Puzzle } from '../types'
import Scale from './Scale'
import ExplainPanel from './ExplainPanel'

interface Props {
  puzzle: Puzzle
  /** Stars already earned for this puzzle (shows a "solved" badge). */
  earnedStars: number
  onSolve: (puzzleId: string, stars: number) => void
  onBack: () => void
  /** Move to the next puzzle, if there is one. */
  onNext?: () => void
}

/**
 * Renders one multiple-choice puzzle (quiz OR discovery — same shape):
 * a given "rule" scale, optional extra rules, four answer scales, instant
 * Correct/Wrong feedback, and a "Show me why" explanation.
 *
 * Stars: 3 if solved on the first try with no peeking, 2 with one wrong try
 * or after peeking, 1 otherwise.
 */
export default function PuzzleView({ puzzle, earnedStars, onSolve, onBack, onNext }: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  const [wrongTries, setWrongTries] = useState(0)
  const [peeked, setPeeked] = useState(false)
  const [showExplain, setShowExplain] = useState(false)
  const [solved, setSolved] = useState(false)

  const question = puzzle.kind === 'discovery' ? puzzle.question : puzzle.prompt
  const extraFacts = puzzle.kind === 'quiz' ? puzzle.extraFacts ?? [] : []

  const handlePick = (optionId: string) => {
    if (solved) return
    const option = puzzle.options.find((o) => o.id === optionId)!
    setPicked(optionId)
    if (option.isCorrect) {
      const stars = wrongTries === 0 && !peeked ? 3 : wrongTries <= 1 && !peeked ? 2 : 1
      setSolved(true)
      onSolve(puzzle.id, stars)
    } else {
      setWrongTries((n) => n + 1)
    }
  }

  const pickedOption = picked ? puzzle.options.find((o) => o.id === picked) : null
  const pickedCorrect = pickedOption?.isCorrect ?? false

  return (
    <div className="screen puzzle-view">
      <header className="screen-header">
        <button className="btn-back" onClick={onBack} type="button">
          ← Back
        </button>
        <h2>{puzzle.kind === 'discovery' ? 'Figure out the Secret' : 'Quiz Time'}</h2>
        {earnedStars > 0 && <span className="solved-badge">{'⭐'.repeat(earnedStars)}</span>}
      </header>

      <p className="screen-intro">{puzzle.prompt}</p>

      {/* The given rule(s). */}
      <div className="given-rules">
        <div className="given-rule">
          <span className="rule-label">We know:</span>
          <Scale left={puzzle.given.left} right={puzzle.given.right} mode="level" size={0.95} />
        </div>
        {extraFacts.map((fact, i) => (
          <div className="given-rule" key={i}>
            <span className="rule-label">and:</span>
            <Scale left={fact.left} right={fact.right} mode="level" size={0.95} />
          </div>
        ))}
      </div>

      {puzzle.kind === 'discovery' && <p className="puzzle-question">{question}</p>}

      {/* Answer options. */}
      <div className="options-grid">
        {puzzle.options.map((opt) => {
          const isPicked = picked === opt.id
          const state =
            isPicked && opt.isCorrect
              ? 'correct'
              : isPicked && !opt.isCorrect
                ? 'wrong'
                : solved && opt.isCorrect
                  ? 'reveal'
                  : ''
          return (
            <button
              key={opt.id}
              type="button"
              className={`option-card ${state}`}
              onClick={() => handlePick(opt.id)}
              disabled={solved}
            >
              <span className="option-letter">{opt.id}</span>
              <Scale left={opt.scale.left} right={opt.scale.right} mode="level" size={0.7} />
            </button>
          )
        })}
      </div>

      {/* Feedback line. */}
      {picked && (
        <div className={`feedback ${pickedCorrect ? 'good' : 'bad'}`}>
          {pickedCorrect
            ? '🎉 Correct! Nice reasoning.'
            : '❌ Not quite — think about the rule, then try again.'}
        </div>
      )}

      {/* Actions. */}
      <div className="puzzle-actions">
        <button
          className="btn-secondary"
          type="button"
          onClick={() => {
            setPeeked(true)
            setShowExplain(true)
          }}
        >
          💡 Show me why
        </button>
        {solved && onNext && (
          <button className="btn-primary" type="button" onClick={onNext}>
            Next puzzle →
          </button>
        )}
      </div>

      {showExplain && (
        <ExplainPanel steps={puzzle.explanation} onClose={() => setShowExplain(false)} />
      )}
    </div>
  )
}
