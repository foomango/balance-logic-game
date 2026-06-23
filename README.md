# ⚖️ Balance Buddy

An interactive game that helps a 3rd grader understand the **balance-scale logic
problems** on Advanced Academic Programs (AAP) tests. The real skill is *reasoning
about equal groups when you don't know each shape's weight* — pre-algebra, dressed up
as a balance scale.

See `specs/balance-logic-game.md` for the full design and `images/` for the example
test questions it's modeled on.

## Run it

```bash
npm install
npm run dev      # open the printed http://localhost:5173 URL
```

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## The three modes

1. **Play with the Scale (Sandbox)** — drag or tap shapes onto the plates and watch the
   beam tip toward the heavier side, sitting level when both groups weigh the same.
   "Peek at weights" reveals the hidden numbers so an adult can explain.
2. **Figure out the Secret (Discovery)** — guided one-question puzzles that teach the
   core rule: a balanced scale tells you two *groups* are equal, not what one shape
   weighs.
3. **Quiz Time** — the real test format: a given balanced "rule" + four answer scales.
   Includes the two example-image puzzles. Every puzzle has a **"Show me why"**
   step-by-step explanation.

Progress (stars per puzzle) is saved in the browser.

## Adding puzzles

Puzzles are pure data — edit `src/data/puzzles.ts`. No new code is needed; each puzzle
lists its given rule(s), four option scales, and the ordered explanation steps.
