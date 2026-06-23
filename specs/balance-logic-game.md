# Balance Logic Game — AAP Practice for 3rd Graders

## Context

An **interactive game** to help a 3rd-grade student understand the "balance scale"
logic problems found on **Advanced Academic Programs (AAP)** tests.
The two example images (`images/quize1.png`, `images/quize2.png`) show the real test
format:

- **Quiz 1:** A scale shows `3 cylinders = 2 triangles`. The student must pick which
  *other* pair of groups would also balance. Key insight: you **cannot** know any
  single shape's weight, so the only guaranteed-equal groups are ones that are
  logically forced (or the trivial "a shape equals itself"). Answer: **C**.
- **Quiz 2:** Pure **substitution** — given `square = nothing` and `circle + square =
  circle`, deduce which other groupings must be equal. Answer: **D**.

The real skill being taught is **pre-algebraic reasoning with unknowns**, not weighing
objects. The game must move the child from intuitive physics ("the heavier side dips")
toward abstract logic ("which groups *must* be equal even when I don't know the
weights").

The game must also serve as a **teaching aid** ("I can help the student understand how
the balance problem works"), so it needs a clear, visual "explain why" mode like the
worked solutions in the example images.

## Decisions (confirmed with user)

- **Gameplay:** Sandbox first (feel balance), then quiz (abstract logic).
- **Platform:** A small web-app project (not a single file).
- **Stack:** **Vite + React + TypeScript**.
- **Theme:** Simple shapes matching the test (cylinder, triangle, square, circle).
- **Progress:** Simple stars + "X of N solved", saved in the browser (localStorage).

## Game Design

Three modes, surfaced from a kid-friendly home screen:

### 1. Sandbox ("Play with the scale")
A draggable balance scale that **tilts in real time**.
- A tray of shapes; drag shapes onto the left or right pan.
- The beam rotates with a CSS transition based on (leftWeight − rightWeight); pans
  rise/fall. When equal, it sits level and shows a happy "Balanced!" state.
- Each shape has a hidden weight (configurable). A "peek weights" teacher toggle reveals
  the numbers — used by the adult to explain, hidden by default so the child reasons.
- Purpose: build the gut feeling of heavier/lighter and "equal = level" before going
  abstract.

### 2. Discovery levels ("Figure out the secret")
Bridges sandbox → quiz. The child is *given* a balanced scale (e.g. `3 cylinders =
2 triangles`) that they **cannot change**, and must use that fact to answer a question.
Introduces the core rule explicitly: *we don't know each shape's weight, only that these
two groups are equal.* Uses the simplest 1–2 step deductions.

### 3. Quiz ("Test like a champ")
Replicates the example-image format exactly:
- Top: a given balanced scale (the "rule").
- 4 answer options (A–D), each a small two-group scale.
- Child taps an option → immediate Correct/Wrong feedback (matching the red "Wrong" /
  "Correct" badge in the examples).
- **"Show me why" button** animates the worked solution (substitution steps), mirroring
  the hand-drawn explanations at the bottom of both example images.

### Teaching / "Explain why" mode (core to the user's goal)
A reusable explanation panel that animates the logic step by step:
- Highlights the given equation.
- Shows substitution: replace a group with its known-equal group, cancel identical
  shapes from both sides, reveal the match.
- Plain-language captions a 3rd grader can read aloud with an adult.

## Project Structure (proposed)

```
balance/                      (existing dir; project root)
  images/                     (existing example pngs — keep as design reference)
  specs/                      (this spec)
  index.html                  Vite entry
  package.json
  tsconfig.json
  vite.config.ts
  src/
    main.tsx
    App.tsx                   Router between Home / Sandbox / Levels / Quiz
    types.ts                  Shape, Group, Puzzle, Option types
    data/
      shapes.ts               Shape defs (id, name, color, svg, hidden weight)
      puzzles.ts              Discovery + quiz puzzle data (the "level pack")
    components/
      Scale.tsx               The visual balance: beam tilt, two pans, shapes
      Pan.tsx                 A single pan (drop target in sandbox)
      ShapeIcon.tsx           SVG renderer for a shape (cylinder/triangle/square/circle)
      ShapeTray.tsx           Draggable source shapes (sandbox)
      Home.tsx                Mode selection + progress/stars
      Sandbox.tsx             Free-play scale
      LevelView.tsx           Discovery levels
      Quiz.tsx                Given scale + 4 options + feedback
      ExplainPanel.tsx        Animated "show me why" substitution
      ProgressBar.tsx         Stars / X-of-N
    hooks/
      useProgress.ts          localStorage-backed stars & solved-set
      useScaleTilt.ts         Compute beam angle from group weights
    styles/                   CSS (kid-friendly: big targets, bright, rounded)
```

## Key Implementation Notes (reuse / approach)

- **Shapes as inline SVG** in `ShapeIcon.tsx` (one component, switch on `shape.id`) so
  they're crisp, recolorable, and need no image assets. Match the example palette
  (red cylinders, green triangles, blue circles, etc.).
- **Tilt logic** (`useScaleTilt`): `angle = clamp(k * sign(leftW - rightW) * f(|diff|),
  -maxDeg, +maxDeg)`; animate the beam with a CSS `transform: rotate()` transition.
  Pans translate opposite to the beam ends.
- **Drag-and-drop** in Sandbox: start with HTML5 native DnD (lightest, no dependency);
  it must also work with **tap-to-place** since young kids/touchscreens struggle with
  drag — provide a "tap a shape, then tap a pan" fallback. (Reconsider a small lib like
  `@dnd-kit` only if native DnD proves clumsy.)
- **Puzzle data model** (`puzzles.ts`): each quiz puzzle = `{ given: Group=Group,
  options: [{groups, isCorrect}], explanationSteps: [...] }`. This makes adding levels
  pure data, no new code. Seed it with the two example images as the first two quiz
  puzzles, plus a handful of simpler warm-ups.
- **Explanation engine**: drive `ExplainPanel` from `explanationSteps` (an ordered list
  of "highlight / substitute / cancel / reveal" actions) so every puzzle explains itself
  consistently. Start with hand-authored steps per puzzle (simple, reliable).
- **Progress** (`useProgress`): store `{ solved: Set<puzzleId>, stars: Record<id,1-3> }`
  in localStorage; Home reads it for the "X of N" and star display.

## Difficulty Ramp (level pack content)

1. Sandbox free play (no goal).
2. "Make it balance" — drag to match a target (sandbox with a goal).
3. Given `A = B`: which of these is also `A`? (1-step, identity & given).
4. Substitution with "nothing" (Quiz 2 idea: `square = nothing`).
5. Two-step substitution (Quiz 2 full).
6. "Can't know" puzzles (Quiz 1 idea: why only the forced answer works).

## Verification

- `npm install && npm run dev`, open the local URL.
- **Sandbox:** drag/tap shapes onto pans; confirm the beam tilts toward the heavier
  side and sits level when equal; toggle "peek weights".
- **Quiz:** load the two example puzzles; confirm the correct answer matches the images
  (Quiz1 → C, Quiz2 → D); tap a wrong option → "Wrong" feedback; tap "Show me why" →
  animated substitution plays.
- **Progress:** solve a puzzle, reload the page, confirm stars/solved state persist.
- Manually drive with the Playwright MCP tools (navigate to dev URL, click options,
  screenshot) to confirm the flows render and respond.
- Sanity-check on a touch viewport (small window) that tap-to-place works without drag.

## Open / Deferrable

- Sound effects and richer animations (nice-to-have, add after core works).
- A level editor (out of scope for v1; data file is enough).
- Number of quiz puzzles beyond the seed set — easy to extend later via `puzzles.ts`.
