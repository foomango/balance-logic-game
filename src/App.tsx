import { useState } from 'react'
import Home from './components/Home'
import Sandbox from './components/Sandbox'
import type { SandboxInit } from './components/Sandbox'
import PuzzleView from './components/PuzzleView'
import { useProgress } from './hooks/useProgress'
import { ALL_PUZZLES, findPuzzle } from './data/puzzles'
import { computeBalancedWeights } from './data/shapes'
import type { Puzzle } from './types'

type Route = { name: 'home' } | { name: 'sandbox'; initial?: SandboxInit } | { name: 'puzzle'; id: string }

declare function gtag(...args: unknown[]): void

/** Tiny hand-rolled router — three screens, no dependency needed. */
export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' })
  const { recordSolve, starsFor, solvedCount } = useProgress()

  const goHome = () => setRoute({ name: 'home' })

  const handleTrySandbox = (puzzle: Puzzle) => {
    const weights = computeBalancedWeights(puzzle.given)
    setRoute({
      name: 'sandbox',
      initial: { left: [...puzzle.given.left], right: [...puzzle.given.right], weights },
    })
  }

  const handlePlayPuzzle = (id: string) => {
    if (typeof gtag === 'function') gtag('event', 'puzzle_start', { puzzle_id: id })
    setRoute({ name: 'puzzle', id })
  }

  const handleSolve = (id: string, stars: number) => {
    if (typeof gtag === 'function') gtag('event', 'puzzle_solve', { puzzle_id: id, stars })
    recordSolve(id, stars)
  }

  if (route.name === 'sandbox') {
    return <Sandbox onBack={goHome} initial={route.initial} />
  }

  if (route.name === 'puzzle') {
    const puzzle = findPuzzle(route.id)
    if (!puzzle) {
      goHome()
      return null
    }
    const idx = ALL_PUZZLES.findIndex((p) => p.id === puzzle.id)
    const next = ALL_PUZZLES[idx + 1]
    return (
      <PuzzleView
        key={puzzle.id}
        puzzle={puzzle}
        earnedStars={starsFor(puzzle.id)}
        onSolve={handleSolve}
        onBack={goHome}
        onNext={next ? () => setRoute({ name: 'puzzle', id: next.id }) : undefined}
        onTrySandbox={() => handleTrySandbox(puzzle)}
      />
    )
  }

  return (
    <Home
      starsFor={starsFor}
      solvedCount={solvedCount}
      totalPuzzles={ALL_PUZZLES.length}
      onPlaySandbox={() => setRoute({ name: 'sandbox' })}
      onPlayPuzzle={handlePlayPuzzle}
    />
  )
}
