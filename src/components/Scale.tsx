import type { Group } from '../types'
import ShapeIcon from './ShapeIcon'
import { tiltAngle } from '../hooks/useScaleTilt'
import { shapeWeight, type WeightMap } from '../data/shapes'

type Side = 'left' | 'right'

interface Props {
  left: Group
  right: Group
  /**
   * 'physical' — tilt by the shapes' hidden weights (Sandbox).
   * 'level'    — always draw level; used to *display* a group-vs-group
   *              comparison (quiz options, given rules, explanations).
   */
  mode?: 'physical' | 'level'
  size?: number
  showWeights?: boolean
  /** Sandbox: child-chosen weights overriding the defaults. */
  weights?: WeightMap
  /** Sandbox: a shape was dropped on a pan. */
  onDropShape?: (side: Side, shape: string) => void
  /** Sandbox: a pan was tapped (tap-to-place fallback) or a shape removed. */
  onPanClick?: (side: Side) => void
  /** Sandbox: tapping a shape already on a pan removes it. */
  onShapeClick?: (side: Side, index: number) => void
  /** Highlight a side (used by the explanation animation). */
  highlight?: Side | 'both' | null
}

/**
 * The visual balance scale. The beam rotates; each pan hangs from a beam end
 * and stays horizontal while sliding up/down as the beam tilts.
 */
export default function Scale({
  left,
  right,
  mode = 'physical',
  size = 1,
  showWeights = false,
  weights,
  onDropShape,
  onPanClick,
  onShapeClick,
  highlight = null,
}: Props) {
  const angle = mode === 'physical' ? tiltAngle(left, right, weights) : 0
  const isBalanced = angle === 0
  const interactive = Boolean(onDropShape || onPanClick)

  // Each pan drops by an amount proportional to the beam tilt so it looks like
  // it hangs from the beam end. (Left dips when angle > 0.)
  const drop = angle * 2.2

  return (
    <div className="scale" style={{ fontSize: `${size}em` }}>
      <div className="scale-beam-area">
        <div
          className="scale-beam"
          style={{ transform: `rotate(${-angle}deg)` }}
        >
          <div className="scale-beam-bar" />
        </div>

        <Pan
          side="left"
          group={left}
          translateY={drop}
          highlighted={highlight === 'left' || highlight === 'both'}
          showWeights={showWeights}
          weights={weights}
          interactive={interactive}
          onDropShape={onDropShape}
          onPanClick={onPanClick}
          onShapeClick={onShapeClick}
        />
        <Pan
          side="right"
          group={right}
          translateY={-drop}
          highlighted={highlight === 'right' || highlight === 'both'}
          showWeights={showWeights}
          weights={weights}
          interactive={interactive}
          onDropShape={onDropShape}
          onPanClick={onPanClick}
          onShapeClick={onShapeClick}
        />

        <div className="scale-stand">
          <div className="scale-post" />
          <div className="scale-base" />
        </div>
      </div>

      {mode === 'physical' && (
        <div className={`scale-status ${isBalanced ? 'balanced' : 'tipped'}`}>
          {isBalanced ? '✓ Balanced!' : 'Not balanced'}
        </div>
      )}
    </div>
  )
}

interface PanProps {
  side: Side
  group: Group
  translateY: number
  highlighted: boolean
  showWeights: boolean
  weights?: WeightMap
  interactive: boolean
  onDropShape?: (side: Side, shape: string) => void
  onPanClick?: (side: Side) => void
  onShapeClick?: (side: Side, index: number) => void
}

function Pan({
  side,
  group,
  translateY,
  highlighted,
  showWeights,
  weights,
  interactive,
  onDropShape,
  onPanClick,
  onShapeClick,
}: PanProps) {
  return (
    <div
      className={`scale-pan scale-pan-${side}`}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="scale-pan-rope" />
      <div
        className={`scale-pan-dish ${highlighted ? 'highlighted' : ''} ${
          interactive ? 'interactive' : ''
        }`}
        onClick={interactive && onPanClick ? () => onPanClick(side) : undefined}
        onDragOver={
          onDropShape
            ? (e) => {
                e.preventDefault()
              }
            : undefined
        }
        onDrop={
          onDropShape
            ? (e) => {
                e.preventDefault()
                const shape = e.dataTransfer.getData('text/plain')
                if (shape) onDropShape(side, shape)
              }
            : undefined
        }
      >
        <div className="scale-pan-shapes">
          {group.length === 0 && interactive && (
            <span className="scale-pan-hint">drop here</span>
          )}
          {group.map((shape, i) =>
            onShapeClick ? (
              <button
                key={`${shape}-${i}`}
                className="scale-pan-shape-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onShapeClick(side, i)
                }}
                title="Tap to remove"
                type="button"
              >
                <ShapeIcon
                  shape={shape}
                  showWeight={showWeights}
                  weight={shapeWeight(shape, weights)}
                />
              </button>
            ) : (
              <span key={`${shape}-${i}`} className="scale-pan-shape-btn">
                <ShapeIcon
                  shape={shape}
                  showWeight={showWeights}
                  weight={shapeWeight(shape, weights)}
                />
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
