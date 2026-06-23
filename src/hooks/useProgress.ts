import { useCallback, useEffect, useState } from 'react'
import type { Progress } from '../types'

const STORAGE_KEY = 'balance-buddy-progress-v1'

const EMPTY: Progress = { stars: {} }

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Progress
    return { stars: parsed.stars ?? {} }
  } catch {
    return EMPTY
  }
}

/**
 * localStorage-backed progress: which puzzles are solved and how many stars
 * each earned (1..3). Shared across the app so Home, Quiz, and Levels stay
 * in sync.
 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Ignore quota / private-mode errors — progress is a nicety, not core.
    }
  }, [progress])

  /** Record a solve. Keeps the best (highest) star count for a puzzle. */
  const recordSolve = useCallback((puzzleId: string, stars: number) => {
    setProgress((prev) => {
      const best = Math.max(prev.stars[puzzleId] ?? 0, stars)
      return { stars: { ...prev.stars, [puzzleId]: best } }
    })
  }, [])

  const starsFor = useCallback(
    (puzzleId: string): number => progress.stars[puzzleId] ?? 0,
    [progress],
  )

  const isSolved = useCallback(
    (puzzleId: string): boolean => puzzleId in progress.stars,
    [progress],
  )

  const solvedCount = Object.keys(progress.stars).length

  const reset = useCallback(() => setProgress(EMPTY), [])

  return { progress, recordSolve, starsFor, isSolved, solvedCount, reset }
}
