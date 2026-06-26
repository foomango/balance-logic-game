import { useState } from 'react'
import type { Group, ShapeId } from '../types'
import Scale from './Scale'
import ShapeTray from './ShapeTray'
import WeightControls from './WeightControls'
import { DEFAULT_WEIGHTS, type WeightMap } from '../data/shapes'

type Side = 'left' | 'right'

export interface SandboxInit {
  left: Group
  right: Group
  weights: Record<string, number>
}

interface Props {
  onBack: () => void
  initial?: SandboxInit
}

/**
 * Free-play scale. The child builds two groups and watches the beam tilt
 * toward the heavier side, sitting level when the two groups weigh the same.
 * Supports drag-and-drop and tap-to-place.
 */
export default function Sandbox({ onBack, initial }: Props) {
  const [left, setLeft] = useState<Group>(initial?.left ?? [])
  const [right, setRight] = useState<Group>(initial?.right ?? [])
  const [selected, setSelected] = useState<ShapeId | null>(null)
  const [peek, setPeek] = useState(!!initial)
  const [weights, setWeights] = useState<WeightMap>(initial?.weights ?? { ...DEFAULT_WEIGHTS })
  const [showWeightControls, setShowWeightControls] = useState(false)

  const setter = (side: Side) => (side === 'left' ? setLeft : setRight)

  const addShape = (side: Side, shape: ShapeId) => {
    setter(side)((prev) => [...prev, shape])
  }

  const removeShape = (side: Side, index: number) => {
    setter(side)((prev) => prev.filter((_, i) => i !== index))
  }

  // Tap-to-place: if a shape is selected in the tray, tapping a pan places it.
  const handlePanClick = (side: Side) => {
    if (selected) addShape(side, selected)
  }

  const handleDrop = (side: Side, shape: string) => {
    addShape(side, shape as ShapeId)
  }

  return (
    <div className="screen sandbox">
      <header className="screen-header">
        <button className="btn-back" onClick={onBack} type="button">
          ← Back
        </button>
        <h2>Play with the Scale</h2>
        <label className="peek-toggle">
          <input type="checkbox" checked={peek} onChange={(e) => setPeek(e.target.checked)} />
          Peek at weights
        </label>
      </header>

      <p className="screen-intro">
        Put shapes on each plate. The heavier side goes <b>down</b>. When both
        sides weigh the same, the scale is <b>level</b>!
      </p>

      <Scale
        left={left}
        right={right}
        mode="physical"
        size={1.3}
        showWeights={peek}
        weights={weights}
        onDropShape={handleDrop}
        onPanClick={handlePanClick}
        onShapeClick={removeShape}
      />

      <div className="sandbox-controls">
        <button
          className="btn-secondary"
          type="button"
          onClick={() => {
            setLeft([])
            setRight([])
          }}
        >
          Clear plates
        </button>
        <button
          className="btn-secondary"
          type="button"
          aria-pressed={showWeightControls}
          onClick={() => {
            // Showing the controls also reveals the numbers being set.
            setShowWeightControls((v) => {
              if (!v) setPeek(true)
              return !v
            })
          }}
        >
          {showWeightControls ? 'Hide weights' : '⚖️ Set weights'}
        </button>
        <span className="sandbox-hint">Tap a shape on a plate to take it off.</span>
      </div>

      {showWeightControls && (
        <WeightControls
          weights={weights}
          onChange={setWeights}
          onReset={() => setWeights({ ...DEFAULT_WEIGHTS })}
        />
      )}

      <ShapeTray selected={selected} onSelect={setSelected} showWeights={peek} weights={weights} />
    </div>
  )
}
