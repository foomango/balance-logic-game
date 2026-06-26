import type { DiscoveryPuzzle, QuizPuzzle, Puzzle } from '../types'

// ---------------------------------------------------------------------------
// Discovery levels — gentle, guided bridge from "feel the scale" to "reason
// about equal groups". Each gives a balanced rule and asks one question.
// ---------------------------------------------------------------------------

const discovery1: DiscoveryPuzzle = {
  id: 'd1',
  kind: 'discovery',
  prompt: 'The scale below is balanced. Use it to answer the question.',
  given: { left: ['triangle'], right: ['cylinder', 'cylinder'] },
  question: 'Which group weighs the SAME as 1 cone?',
  options: [
    { id: 'A', scale: { left: ['cylinder'], right: [] }, isCorrect: false },
    { id: 'B', scale: { left: ['cylinder', 'cylinder'], right: [] }, isCorrect: true },
    { id: 'C', scale: { left: ['cylinder', 'cylinder', 'cylinder'], right: [] }, isCorrect: false },
    { id: 'D', scale: { left: ['triangle', 'triangle'], right: [] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'The scale is balanced, so 1 cone weighs exactly the same as 2 cans.',
      scale: { left: ['triangle'], right: ['cylinder', 'cylinder'] },
      isFact: true,
    },
    { caption: 'So the group that matches 1 cone is 2 cans!' },
  ],
}

const discovery2: DiscoveryPuzzle = {
  id: 'd2',
  kind: 'discovery',
  prompt: 'The scale below is balanced. Use it to answer the question.',
  given: { left: ['circle'], right: ['square', 'cylinder'] },
  question: 'Which group weighs the SAME as 1 marble?',
  options: [
    { id: 'A', scale: { left: ['square', 'square'], right: [] }, isCorrect: false },
    { id: 'B', scale: { left: ['cylinder', 'cylinder'], right: [] }, isCorrect: false },
    { id: 'C', scale: { left: ['square', 'cylinder'], right: [] }, isCorrect: true },
    { id: 'D', scale: { left: ['circle', 'circle'], right: [] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'The scale is balanced, so 1 marble weighs the same as 1 block + 1 can.',
      scale: { left: ['circle'], right: ['square', 'cylinder'] },
      isFact: true,
    },
    { caption: 'So the matching group is 1 block and 1 can.' },
  ],
}

// ---------------------------------------------------------------------------
// Quiz levels — the multiple-choice format from the AAP test images.
// ---------------------------------------------------------------------------

// Warm-up: "do the same thing to both sides" (doubling).
const quizDouble: QuizPuzzle = {
  id: 'q-double',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['cylinder', 'cylinder'], right: ['triangle'] },
  options: [
    {
      id: 'A',
      scale: { left: ['cylinder', 'cylinder', 'cylinder', 'cylinder'], right: ['triangle', 'triangle'] },
      isCorrect: true,
    },
    { id: 'B', scale: { left: ['cylinder', 'cylinder', 'cylinder'], right: ['triangle'] }, isCorrect: false },
    { id: 'C', scale: { left: ['cylinder'], right: ['triangle'] }, isCorrect: false },
    { id: 'D', scale: { left: ['cylinder', 'cylinder'], right: ['triangle', 'triangle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 2 cans weigh the same as 1 cone.',
      scale: { left: ['cylinder', 'cylinder'], right: ['triangle'] },
      isFact: true,
    },
    {
      caption: 'If we DOUBLE both sides, the scale still balances.',
      scale: {
        left: ['cylinder', 'cylinder', 'cylinder', 'cylinder'],
        right: ['triangle', 'triangle'],
      },
    },
    { caption: '4 cans = 2 cones. That is answer A!' },
  ],
}

// Example image #1 — "we cannot know each shape, so only a shape = itself is sure".
const quizExample1: QuizPuzzle = {
  id: 'q-ex1',
  kind: 'quiz',
  prompt:
    'Choose the answer that shows two groups of shapes that, when placed on the scale, would also be of equal weight.',
  given: { left: ['cylinder', 'cylinder', 'cylinder'], right: ['triangle', 'triangle'] },
  options: [
    { id: 'A', scale: { left: ['cylinder'], right: ['triangle'] }, isCorrect: false },
    { id: 'B', scale: { left: ['cylinder', 'cylinder'], right: ['triangle', 'triangle'] }, isCorrect: false },
    {
      id: 'C',
      scale: { left: ['cylinder', 'triangle'], right: ['triangle', 'cylinder'] },
      isCorrect: true,
    },
    { id: 'D', scale: { left: ['triangle'], right: ['cylinder'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We are told 3 cans balance 2 cones. But that does NOT tell us what one can or one cone weighs by itself.',
      scale: { left: ['cylinder', 'cylinder', 'cylinder'], right: ['triangle', 'triangle'] },
      isFact: true,
    },
    {
      caption: 'So we cannot trust answers that compare cans to cones in a new way — we just do not know.',
    },
    {
      caption: 'But a shape always equals itself! 1 can + 1 cone on each side must be equal, no matter the weights.',
      scale: { left: ['cylinder', 'triangle'], right: ['triangle', 'cylinder'] },
    },
    { caption: 'The sure answer is C.' },
  ],
}

// Example image #2 — given marble+block = marble, so a block weighs nothing.
const quizExample2: QuizPuzzle = {
  id: 'q-ex2',
  kind: 'quiz',
  prompt:
    'Choose the answer that shows two groups of shapes that, when placed on the scale, would also be of equal weight.',
  given: { left: ['circle', 'square'], right: ['circle'] },
  options: [
    { id: 'A', scale: { left: ['square', 'square'], right: ['circle'] }, isCorrect: false },
    { id: 'B', scale: { left: ['circle', 'circle', 'circle'], right: ['square', 'square', 'square'] }, isCorrect: false },
    { id: 'C', scale: { left: ['circle', 'square'], right: ['square'] }, isCorrect: false },
    {
      id: 'D',
      scale: { left: ['circle', 'circle', 'square'], right: ['circle', 'circle'] },
      isCorrect: true,
    },
  ],
  explanation: [
    {
      caption: 'We are told 1 marble and 1 block weigh the same as just 1 marble.',
      scale: { left: ['circle', 'square'], right: ['circle'] },
      isFact: true,
    },
    {
      caption: 'Take away 1 marble from BOTH sides. What is left? 1 block weighs the same as nothing — so a block weighs 0!',
      scale: { left: ['square'], right: [] },
    },
    {
      caption: 'A block weighs nothing, so we can add one to a side without changing the balance: 2 marbles + 1 block = 2 marbles.',
      scale: { left: ['circle', 'circle', 'square'], right: ['circle', 'circle'] },
    },
    { caption: 'The answer is D.' },
  ],
}

// Quiz — hexagon + rectangle deduction: subtract a circle from both sides.
const quizHexRect: QuizPuzzle = {
  id: 'q-hex-rect',
  kind: 'quiz',
  prompt:
    'The top scale is balanced. Which group below is correct?',
  given: {
    left: ['hexagon', 'rectangle', 'circle', 'circle', 'triangle'],
    right: ['triangle', 'triangle', 'triangle', 'circle', 'circle', 'circle', 'circle', 'circle'],
  },
  options: [
    { id: 'A', scale: { left: ['hexagon', 'rectangle', 'triangle'], right: ['rectangle', 'triangle', 'triangle'] }, isCorrect: false },
    {
      id: 'B',
      scale: { left: ['hexagon', 'rectangle', 'triangle'], right: ['triangle', 'triangle', 'triangle', 'circle', 'circle', 'circle'] },
      isCorrect: true,
    },
    { id: 'C', scale: { left: ['hexagon', 'rectangle', 'triangle'], right: ['circle', 'circle', 'triangle', 'triangle', 'triangle'] }, isCorrect: false },
    { id: 'D', scale: { left: ['hexagon', 'rectangle', 'triangle'], right: ['hexagon', 'triangle', 'circle', 'circle', 'circle'] }, isCorrect: false },
    { id: 'E', scale: { left: ['hexagon', 'rectangle', 'triangle'], right: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know hexagon + rectangle + 2 circles + triangle balances 3 triangles + 5 circles.',
      scale: {
        left: ['hexagon', 'rectangle', 'circle', 'circle', 'triangle'],
        right: ['triangle', 'triangle', 'triangle', 'circle', 'circle', 'circle', 'circle', 'circle'],
      },
      isFact: true,
    },
    {
      caption: 'Remove 2 circles from BOTH sides. Now hexagon + rectangle + triangle = 3 triangles + 3 circles.',
      scale: {
        left: ['hexagon', 'rectangle', 'triangle'],
        right: ['triangle', 'triangle', 'triangle', 'circle', 'circle', 'circle'],
      },
    },
    { caption: 'The answer is B: 3 triangles and 3 circles!' },
  ],
}

// Halving both sides: 4 cyl = 2 tri → half → 2 cyl = 1 tri
const quizHalf: QuizPuzzle = {
  id: 'q-half',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['cylinder', 'cylinder', 'cylinder', 'cylinder'], right: ['triangle', 'triangle'] },
  options: [
    {
      id: 'A',
      scale: { left: ['cylinder', 'cylinder'], right: ['triangle'] },
      isCorrect: true,
    },
    { id: 'B', scale: { left: ['cylinder'], right: ['triangle'] }, isCorrect: false },
    { id: 'C', scale: { left: ['cylinder', 'cylinder', 'cylinder'], right: ['triangle'] }, isCorrect: false },
    { id: 'D', scale: { left: ['cylinder', 'cylinder'], right: ['triangle', 'triangle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 4 cans balance 2 cones.',
      scale: { left: ['cylinder', 'cylinder', 'cylinder', 'cylinder'], right: ['triangle', 'triangle'] },
      isFact: true,
    },
    {
      caption: 'If we HALVE both sides, the scale still balances: 2 cans = 1 cone.',
      scale: { left: ['cylinder', 'cylinder'], right: ['triangle'] },
    },
    { caption: 'The answer is A!' },
  ],
}

// Doubling: 1 circle = 3 squares → double → 2 circles = 6 squares
const quizScaleUp: QuizPuzzle = {
  id: 'q-scale-up',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['circle'], right: ['square', 'square', 'square'] },
  options: [
    { id: 'A', scale: { left: ['circle', 'circle'], right: ['square', 'square', 'square'] }, isCorrect: false },
    { id: 'B', scale: { left: ['circle'], right: ['square', 'square'] }, isCorrect: false },
    {
      id: 'C',
      scale: { left: ['circle', 'circle'], right: ['square', 'square', 'square', 'square', 'square', 'square'] },
      isCorrect: true,
    },
    { id: 'D', scale: { left: ['circle', 'circle', 'circle'], right: ['square', 'square', 'square'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 1 marble balances 3 blocks.',
      scale: { left: ['circle'], right: ['square', 'square', 'square'] },
      isFact: true,
    },
    {
      caption: 'If we DOUBLE both sides, the scale still balances: 2 marbles = 6 blocks.',
      scale: { left: ['circle', 'circle'], right: ['square', 'square', 'square', 'square', 'square', 'square'] },
    },
    { caption: 'The answer is C!' },
  ],
}

// Add same shape to both sides: 1 tri = 2 cyl → add 1 sq to both sides
const quizAddBoth: QuizPuzzle = {
  id: 'q-add-both',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['triangle'], right: ['cylinder', 'cylinder'] },
  options: [
    { id: 'A', scale: { left: ['triangle', 'square'], right: ['cylinder', 'cylinder', 'cylinder'] }, isCorrect: false },
    {
      id: 'B',
      scale: { left: ['triangle', 'square'], right: ['cylinder', 'cylinder', 'square'] },
      isCorrect: true,
    },
    { id: 'C', scale: { left: ['triangle', 'triangle'], right: ['cylinder', 'cylinder', 'square'] }, isCorrect: false },
    { id: 'D', scale: { left: ['triangle', 'square'], right: ['cylinder', 'square'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 1 cone balances 2 cans.',
      scale: { left: ['triangle'], right: ['cylinder', 'cylinder'] },
      isFact: true,
    },
    {
      caption: 'If we ADD the same thing (1 block) to BOTH sides, the scale still balances.',
      scale: { left: ['triangle', 'square'], right: ['cylinder', 'cylinder', 'square'] },
    },
    { caption: 'The answer is B!' },
  ],
}

// Cancel common items: 2 circles + 1 sq = 1 rect + 1 sq → remove sq → 2 circles = 1 rect
const quizCancel: QuizPuzzle = {
  id: 'q-cancel',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['circle', 'circle', 'square'], right: ['rectangle', 'square'] },
  options: [
    { id: 'A', scale: { left: ['circle'], right: ['rectangle'] }, isCorrect: false },
    { id: 'B', scale: { left: ['circle', 'circle', 'square'], right: ['rectangle'] }, isCorrect: false },
    {
      id: 'C',
      scale: { left: ['circle', 'circle'], right: ['rectangle'] },
      isCorrect: true,
    },
    { id: 'D', scale: { left: ['circle', 'square'], right: ['rectangle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 2 marbles + 1 block balance 1 rectangle + 1 block.',
      scale: { left: ['circle', 'circle', 'square'], right: ['rectangle', 'square'] },
      isFact: true,
    },
    {
      caption: 'Both sides have 1 block. Remove it from both — the scale still balances: 2 marbles = 1 rectangle.',
      scale: { left: ['circle', 'circle'], right: ['rectangle'] },
    },
    { caption: 'The answer is C!' },
  ],
}

// Subtract one item: 3 sq + 1 circle = 2 circles → subtract 1 circle → 3 sq = 1 circle
const quizSubtractOne: QuizPuzzle = {
  id: 'q-subtract-one',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['square', 'square', 'square', 'circle'], right: ['circle', 'circle'] },
  options: [
    { id: 'A', scale: { left: ['square', 'square', 'square'], right: ['circle', 'circle'] }, isCorrect: false },
    { id: 'B', scale: { left: ['square', 'square'], right: ['circle'] }, isCorrect: false },
    { id: 'C', scale: { left: ['square'], right: ['circle'] }, isCorrect: false },
    {
      id: 'D',
      scale: { left: ['square', 'square', 'square'], right: ['circle'] },
      isCorrect: true,
    },
  ],
  explanation: [
    {
      caption: 'We know 3 blocks + 1 marble balance 2 marbles.',
      scale: { left: ['square', 'square', 'square', 'circle'], right: ['circle', 'circle'] },
      isFact: true,
    },
    {
      caption: 'Remove 1 marble from BOTH sides. Now 3 blocks = 1 marble.',
      scale: { left: ['square', 'square', 'square'], right: ['circle'] },
    },
    { caption: 'The answer is D!' },
  ],
}

// Zero-weight deduction: hex + sq = hex → sq = 0
const quizZero: QuizPuzzle = {
  id: 'q-zero',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['hexagon', 'square'], right: ['hexagon'] },
  options: [
    { id: 'A', scale: { left: ['square', 'square'], right: ['hexagon'] }, isCorrect: false },
    {
      id: 'B',
      scale: { left: ['circle', 'square'], right: ['circle'] },
      isCorrect: true,
    },
    { id: 'C', scale: { left: ['hexagon', 'square'], right: ['square'] }, isCorrect: false },
    { id: 'D', scale: { left: ['square'], right: ['circle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 1 hexagon + 1 block balances 1 hexagon alone.',
      scale: { left: ['hexagon', 'square'], right: ['hexagon'] },
      isFact: true,
    },
    {
      caption: 'Remove 1 hexagon from both sides. The block weighs the same as nothing — it weighs 0!',
      scale: { left: ['square'], right: [] },
    },
    {
      caption: 'Since the block weighs nothing, adding it to a side does not change the balance: 1 marble + 1 block = 1 marble.',
      scale: { left: ['circle', 'square'], right: ['circle'] },
    },
    { caption: 'The answer is B!' },
  ],
}

// Double a complex equation: 1 hex = 1 tri + 1 cyl + 1 sq → double both
const quizCombineDouble: QuizPuzzle = {
  id: 'q-combine-double',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['hexagon'], right: ['triangle', 'cylinder', 'square'] },
  options: [
    { id: 'A', scale: { left: ['hexagon', 'hexagon'], right: ['triangle', 'triangle', 'cylinder', 'square'] }, isCorrect: false },
    { id: 'B', scale: { left: ['hexagon', 'hexagon'], right: ['triangle', 'cylinder', 'cylinder', 'square', 'square'] }, isCorrect: false },
    {
      id: 'C',
      scale: { left: ['hexagon', 'hexagon'], right: ['triangle', 'triangle', 'cylinder', 'cylinder', 'square', 'square'] },
      isCorrect: true,
    },
    { id: 'D', scale: { left: ['hexagon', 'hexagon'], right: ['triangle', 'cylinder', 'square'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 1 hexagon balances 1 cone + 1 can + 1 block.',
      scale: { left: ['hexagon'], right: ['triangle', 'cylinder', 'square'] },
      isFact: true,
    },
    {
      caption: 'DOUBLE both sides: 2 hexagons = 2 cones + 2 cans + 2 blocks.',
      scale: { left: ['hexagon', 'hexagon'], right: ['triangle', 'triangle', 'cylinder', 'cylinder', 'square', 'square'] },
    },
    { caption: 'The answer is C!' },
  ],
}

// Complex subtraction: 1 rect + 2 circles = 3 circles + 1 tri → remove 2 circles → 1 rect = 1 circle + 1 tri
const quizComplexSub: QuizPuzzle = {
  id: 'q-complex-sub',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['rectangle', 'circle', 'circle'], right: ['circle', 'circle', 'circle', 'triangle'] },
  options: [
    { id: 'A', scale: { left: ['rectangle'], right: ['circle', 'circle', 'triangle'] }, isCorrect: false },
    {
      id: 'B',
      scale: { left: ['rectangle'], right: ['circle', 'triangle'] },
      isCorrect: true,
    },
    { id: 'C', scale: { left: ['rectangle'], right: ['triangle', 'triangle'] }, isCorrect: false },
    { id: 'D', scale: { left: ['rectangle', 'circle'], right: ['circle', 'triangle'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 1 rectangle + 2 marbles balances 3 marbles + 1 cone.',
      scale: { left: ['rectangle', 'circle', 'circle'], right: ['circle', 'circle', 'circle', 'triangle'] },
      isFact: true,
    },
    {
      caption: 'Remove 2 marbles from BOTH sides. Now 1 rectangle = 1 marble + 1 cone.',
      scale: { left: ['rectangle'], right: ['circle', 'triangle'] },
    },
    { caption: 'The answer is B!' },
  ],
}

// Two-rule substitution: 1 hex = 2 tri; extra: 1 tri = 3 sq → 1 hex = 6 sq
const quizSubstitute: QuizPuzzle = {
  id: 'q-substitute',
  kind: 'quiz',
  prompt:
    'BOTH scales below are balanced. Which answer scale ALSO balances for sure?',
  given: { left: ['hexagon'], right: ['triangle', 'triangle'] },
  extraFacts: [{ left: ['triangle'], right: ['square', 'square', 'square'] }],
  options: [
    { id: 'A', scale: { left: ['hexagon'], right: ['square', 'square', 'square'] }, isCorrect: false },
    { id: 'B', scale: { left: ['hexagon'], right: ['square', 'square', 'square', 'square'] }, isCorrect: false },
    {
      id: 'C',
      scale: { left: ['hexagon'], right: ['square', 'square', 'square', 'square', 'square', 'square'] },
      isCorrect: true,
    },
    { id: 'D', scale: { left: ['hexagon'], right: ['triangle', 'square', 'square', 'square'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'Rule 1: 1 hexagon = 2 cones.',
      scale: { left: ['hexagon'], right: ['triangle', 'triangle'] },
      isFact: true,
    },
    {
      caption: 'Rule 2: 1 cone = 3 blocks.',
      scale: { left: ['triangle'], right: ['square', 'square', 'square'] },
      isFact: true,
    },
    {
      caption: 'Replace each cone with 3 blocks: 1 hexagon = 3 blocks + 3 blocks = 6 blocks!',
      scale: { left: ['hexagon'], right: ['square', 'square', 'square', 'square', 'square', 'square'] },
    },
    { caption: 'The answer is C!' },
  ],
}

// Triple scaling: 2 rect = 3 hex → triple → 6 rect = 9 hex
const quizMultiStep: QuizPuzzle = {
  id: 'q-multi-step',
  kind: 'quiz',
  prompt:
    'The top scale balances. Which answer scale ALSO balances for sure?',
  given: { left: ['rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon'] },
  options: [
    { id: 'A', scale: { left: ['rectangle', 'rectangle', 'rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'] }, isCorrect: true },
    { id: 'B', scale: { left: ['rectangle', 'rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'] }, isCorrect: false },
    { id: 'C', scale: { left: ['rectangle', 'rectangle', 'rectangle', 'rectangle', 'rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'] }, isCorrect: false },
    { id: 'D', scale: { left: ['rectangle', 'rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'] }, isCorrect: false },
  ],
  explanation: [
    {
      caption: 'We know 2 rectangles balance 3 hexagons.',
      scale: { left: ['rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon'] },
      isFact: true,
    },
    {
      caption: 'DOUBLE both sides: 4 rectangles = 6 hexagons.',
      scale: { left: ['rectangle', 'rectangle', 'rectangle', 'rectangle'], right: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'] },
    },
    { caption: 'The answer is A!' },
  ],
}

// ---------------------------------------------------------------------------

export const DISCOVERY_PUZZLES: DiscoveryPuzzle[] = [discovery1, discovery2]

export const QUIZ_PUZZLES: QuizPuzzle[] = [
  quizDouble,
  quizExample1,
  quizExample2,
  quizHexRect,
  quizHalf,
  quizScaleUp,
  quizAddBoth,
  quizCancel,
  quizSubtractOne,
  quizZero,
  quizCombineDouble,
  quizComplexSub,
  quizSubstitute,
  quizMultiStep,
]

/** Everything, in suggested play order. */
export const ALL_PUZZLES: Puzzle[] = [...DISCOVERY_PUZZLES, ...QUIZ_PUZZLES]

export function findPuzzle(id: string): Puzzle | undefined {
  return ALL_PUZZLES.find((p) => p.id === id)
}
