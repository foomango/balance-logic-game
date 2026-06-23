import type { Puzzle } from '../types'
import { DISCOVERY_PUZZLES, QUIZ_PUZZLES } from '../data/puzzles'
import Scale from './Scale'

interface Props {
  starsFor: (id: string) => number
  solvedCount: number
  totalPuzzles: number
  onPlaySandbox: () => void
  onPlayPuzzle: (id: string) => void
}

/** Landing screen: pick Sandbox, a Discovery level, or a Quiz. */
export default function Home({
  starsFor,
  solvedCount,
  totalPuzzles,
  onPlaySandbox,
  onPlayPuzzle,
}: Props) {
  return (
    <div className="screen home">
      <header className="home-header">
        <h1>⚖️ Balance Buddy</h1>
        <p className="tagline">Learn the secret of the balance scale!</p>
        <div className="progress-summary">
          You've solved <b>{solvedCount}</b> of <b>{totalPuzzles}</b> puzzles
        </div>
      </header>

      <section className="home-section">
        <h3>1. Play with the scale</h3>
        <p>Drop shapes on the plates and watch what happens.</p>
        <button className="big-card sandbox-card" type="button" onClick={onPlaySandbox}>
          <Scale left={['triangle']} right={['cylinder', 'cylinder']} mode="physical" size={0.7} />
          <span className="big-card-label">Open the Sandbox →</span>
        </button>
      </section>

      <section className="home-section">
        <h3>2. Figure out the secret</h3>
        <p>Easy puzzles to learn how equal groups work.</p>
        <div className="puzzle-row">
          {DISCOVERY_PUZZLES.map((p, i) => (
            <PuzzleCard key={p.id} puzzle={p} index={i + 1} stars={starsFor(p.id)} onClick={() => onPlayPuzzle(p.id)} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h3>3. Quiz time</h3>
        <p>Real test-style puzzles. Can you spot the sure answer?</p>
        <div className="puzzle-row">
          {QUIZ_PUZZLES.map((p, i) => (
            <PuzzleCard key={p.id} puzzle={p} index={i + 1} stars={starsFor(p.id)} onClick={() => onPlayPuzzle(p.id)} />
          ))}
        </div>
      </section>
    </div>
  )
}

interface CardProps {
  puzzle: Puzzle
  index: number
  stars: number
  onClick: () => void
}

function PuzzleCard({ puzzle, index, stars, onClick }: CardProps) {
  return (
    <button className="puzzle-card" type="button" onClick={onClick}>
      <span className="puzzle-card-num">{index}</span>
      <Scale left={puzzle.given.left} right={puzzle.given.right} mode="level" size={0.55} />
      <span className="puzzle-card-stars">
        {stars > 0 ? '⭐'.repeat(stars) : 'Not solved yet'}
      </span>
    </button>
  )
}
