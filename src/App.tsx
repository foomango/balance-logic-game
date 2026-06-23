import { useState } from 'react'
import Home from './components/Home'
import Sandbox from './components/Sandbox'
import PuzzleView from './components/PuzzleView'
import { useProgress } from './hooks/useProgress'
import { ALL_PUZZLES, findPuzzle } from './data/puzzles'

type Route = { name: 'home' } | { name: 'sandbox' } | { name: 'puzzle'; id: string }

/** Tiny hand-rolled router — three screens, no dependency needed. */
export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' })
  const { recordSolve, starsFor, solvedCount } = useProgress()

  const goHome = () => setRoute({ name: 'home' })

  if (route.name === 'sandbox') {
    return <Sandbox onBack={goHome} />
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
        onSolve={recordSolve}
        onBack={goHome}
        onNext={next ? () => setRoute({ name: 'puzzle', id: next.id }) : undefined}
      />
    )
  }

  return (
    <Home
      starsFor={starsFor}
      solvedCount={solvedCount}
      totalPuzzles={ALL_PUZZLES.length}
      onPlaySandbox={() => setRoute({ name: 'sandbox' })}
      onPlayPuzzle={(id) => setRoute({ name: 'puzzle', id })}
    />
  )
}
