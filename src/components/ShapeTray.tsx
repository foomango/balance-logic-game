import type { ShapeId } from '../types'
import { ALL_SHAPE_IDS, SHAPES, shapeWeight, type WeightMap } from '../data/shapes'
import ShapeIcon from './ShapeIcon'

interface Props {
  /** The currently selected shape for tap-to-place (null = none). */
  selected: ShapeId | null
  onSelect: (shape: ShapeId) => void
  showWeights?: boolean
  /** Child-chosen weights, so the tray badges match the scale. */
  weights?: WeightMap
}

/**
 * Source palette of shapes. Supports BOTH interaction styles:
 *  - drag a shape onto a pan (HTML5 native drag)
 *  - tap a shape to "pick it up", then tap a pan to place it (touch-friendly)
 */
export default function ShapeTray({ selected, onSelect, showWeights = false, weights }: Props) {
  return (
    <div className="shape-tray">
      <div className="shape-tray-label">Shapes — tap one, then tap a plate (or drag it)</div>
      <div className="shape-tray-items">
        {ALL_SHAPE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`tray-shape ${selected === id ? 'selected' : ''}`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', id)
              e.dataTransfer.effectAllowed = 'copy'
            }}
            onClick={() => onSelect(id)}
            aria-pressed={selected === id}
          >
            <ShapeIcon
              shape={id}
              size={52}
              showWeight={showWeights}
              weight={shapeWeight(id, weights)}
            />
            <span className="tray-shape-name">{SHAPES[id].name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
