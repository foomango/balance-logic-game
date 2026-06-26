// ---------------------------------------------------------------------------
// Core domain types for the Balance Logic Game.
// ---------------------------------------------------------------------------

/** Every shape the game knows about. Matches the AAP test palette. */
export type ShapeId = 'cylinder' | 'triangle' | 'square' | 'circle' | 'rectangle' | 'hexagon'

export interface Shape {
  id: ShapeId
  name: string
  /** Fill color used by the inline SVG renderer. */
  color: string
  /**
   * A *hidden* weight, used only by Sandbox so the beam can physically tilt.
   * The logic puzzles never reveal or rely on these numbers — that is the
   * whole point (you reason about equal groups, not known weights).
   */
  weight: number
}

/**
 * A group of shapes sitting on one pan, e.g. three cylinders.
 * Represented as a flat list of shape ids so duplicates are easy to count.
 */
export type Group = ShapeId[]

/** The two pans of a single scale. */
export interface ScaleState {
  left: Group
  right: Group
}

// ---------------------------------------------------------------------------
// Quiz puzzles (the multiple-choice format from the example images).
// ---------------------------------------------------------------------------

export interface QuizOption {
  id: string // 'A' | 'B' | 'C' | 'D'
  scale: ScaleState
  isCorrect: boolean
}

/** One animated step of a "Show me why" explanation. */
export interface ExplainStep {
  /** Plain-language caption a 3rd grader can read aloud. */
  caption: string
  /** Optional little scale to draw alongside the caption. */
  scale?: ScaleState
  /** Optional: render this step as a "fact" equation (given rule). */
  isFact?: boolean
}

export interface QuizPuzzle {
  id: string
  kind: 'quiz'
  /** Short prompt shown above the puzzle. */
  prompt: string
  /** The given balanced scale — the "rule" the child must use. */
  given: ScaleState
  /**
   * Extra given facts beyond the main `given` scale (e.g. Quiz 2 needs two
   * equations). Rendered above the options as additional rules.
   */
  extraFacts?: ScaleState[]
  options: QuizOption[]
  explanation: ExplainStep[]
}

// ---------------------------------------------------------------------------
// Discovery levels (guided, single-question bridge between sandbox & quiz).
// ---------------------------------------------------------------------------

export interface DiscoveryPuzzle {
  id: string
  kind: 'discovery'
  prompt: string
  /** The fixed, balanced "rule" scale the child cannot change. */
  given: ScaleState
  /** The question, e.g. "Which group is the same weight as 1 triangle?" */
  question: string
  options: QuizOption[]
  explanation: ExplainStep[]
}

export type Puzzle = QuizPuzzle | DiscoveryPuzzle

// ---------------------------------------------------------------------------
// Progress (persisted to localStorage).
// ---------------------------------------------------------------------------

export interface Progress {
  /** puzzleId -> stars earned (1..3). Presence means "solved". */
  stars: Record<string, number>
}
