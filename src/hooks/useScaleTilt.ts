import type { Group } from '../types'
import { groupWeight, type WeightMap } from '../data/shapes'

const MAX_DEG = 14

/**
 * Beam angle (degrees) from the two groups' weights.
 * Positive = left side is heavier and dips down (beam rotates clockwise).
 * The magnitude grows with the weight difference but saturates at MAX_DEG so
 * a big imbalance does not flip the scale upside-down. An optional weight map
 * lets Sandbox use child-chosen weights.
 */
export function tiltAngle(left: Group, right: Group, weights?: WeightMap): number {
  const diff = groupWeight(left, weights) - groupWeight(right, weights)
  if (diff === 0) return 0
  const magnitude = Math.min(MAX_DEG, 4 + Math.abs(diff) * 2)
  return Math.sign(diff) * magnitude
}
