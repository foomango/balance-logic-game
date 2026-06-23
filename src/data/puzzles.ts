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

// ---------------------------------------------------------------------------

export const DISCOVERY_PUZZLES: DiscoveryPuzzle[] = [discovery1, discovery2]

export const QUIZ_PUZZLES: QuizPuzzle[] = [quizDouble, quizExample1, quizExample2]

/** Everything, in suggested play order. */
export const ALL_PUZZLES: Puzzle[] = [...DISCOVERY_PUZZLES, ...QUIZ_PUZZLES]

export function findPuzzle(id: string): Puzzle | undefined {
  return ALL_PUZZLES.find((p) => p.id === id)
}
