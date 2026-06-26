import type { ShapeId } from '../types'
import { SHAPES } from '../data/shapes'

interface Props {
  shape: ShapeId
  size?: number
  /** Show the hidden weight number on the shape (Sandbox "peek" mode). */
  showWeight?: boolean
  /** Weight to display; falls back to the shape's default. */
  weight?: number
}

/**
 * Renders a single shape as inline SVG so it stays crisp and recolorable
 * with no image assets. One component, switch on the shape id.
 */
export default function ShapeIcon({ shape, size = 44, showWeight = false, weight }: Props) {
  const { color, weight: defaultWeight, name } = SHAPES[shape]
  const shownWeight = weight ?? defaultWeight
  const darker = shade(color, -28)

  return (
    <span
      className="shape-icon"
      style={{ width: size, height: size }}
      role="img"
      aria-label={name}
      title={name}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {shape === 'cylinder' && (
          <g>
            <rect x="28" y="22" width="44" height="60" rx="6" fill={color} />
            <ellipse cx="50" cy="22" rx="22" ry="8" fill={darker} />
            <ellipse cx="50" cy="82" rx="22" ry="8" fill={darker} />
          </g>
        )}
        {shape === 'triangle' && (
          <polygon points="50,16 86,84 14,84" fill={color} stroke={darker} strokeWidth="2" />
        )}
        {shape === 'square' && (
          <rect x="20" y="20" width="60" height="60" rx="8" fill={color} stroke={darker} strokeWidth="2" />
        )}
        {shape === 'circle' && (
          <circle cx="50" cy="50" r="32" fill={color} stroke={darker} strokeWidth="2" />
        )}
        {shape === 'rectangle' && (
          <rect x="30" y="15" width="40" height="70" rx="6" fill={color} stroke={darker} strokeWidth="2" />
        )}
        {shape === 'hexagon' && (
          <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" fill={color} stroke={darker} strokeWidth="2" />
        )}
      </svg>
      {showWeight && <span className="shape-weight">{shownWeight}</span>}
    </span>
  )
}

/** Lighten/darken a hex color by a percentage amount. */
function shade(hex: string, percent: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = clamp((n >> 16) + percent)
  const g = clamp(((n >> 8) & 0xff) + percent)
  const b = clamp((n & 0xff) + percent)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, v))
}
