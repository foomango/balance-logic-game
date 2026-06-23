import { ALL_SHAPE_IDS, SHAPES, type WeightMap } from '../data/shapes'
import ShapeIcon from './ShapeIcon'

interface Props {
  weights: WeightMap
  onChange: (next: WeightMap) => void
  onReset: () => void
}

const MIN = 0
const MAX = 20

/**
 * Lets the child set each shape's weight with +/- steppers. Changing a weight
 * instantly re-tilts the scale, so they can experiment ("what if a cone weighs
 * the same as a can?").
 */
export default function WeightControls({ weights, onChange, onReset }: Props) {
  const setWeight = (id: (typeof ALL_SHAPE_IDS)[number], value: number) => {
    const clamped = Math.max(MIN, Math.min(MAX, value))
    onChange({ ...weights, [id]: clamped })
  }

  return (
    <div className="weight-controls">
      <div className="weight-controls-head">
        <span className="weight-controls-label">Set how much each shape weighs</span>
        <button className="btn-link" type="button" onClick={onReset}>
          Reset weights
        </button>
      </div>
      <div className="weight-controls-items">
        {ALL_SHAPE_IDS.map((id) => {
          const value = weights[id] ?? SHAPES[id].weight
          return (
            <div className="weight-control" key={id}>
              <ShapeIcon shape={id} size={40} />
              <span className="weight-control-name">{SHAPES[id].name}</span>
              <div className="stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label={`Make ${SHAPES[id].name} lighter`}
                  onClick={() => setWeight(id, value - 1)}
                  disabled={value <= MIN}
                >
                  −
                </button>
                <input
                  type="number"
                  className="stepper-value"
                  value={value}
                  min={MIN}
                  max={MAX}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10)
                    setWeight(id, Number.isNaN(n) ? 0 : n)
                  }}
                  aria-label={`${SHAPES[id].name} weight`}
                />
                <button
                  type="button"
                  className="stepper-btn"
                  aria-label={`Make ${SHAPES[id].name} heavier`}
                  onClick={() => setWeight(id, value + 1)}
                  disabled={value >= MAX}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
