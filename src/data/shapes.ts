import type { Shape, ShapeId } from '../types'

/**
 * The four shapes from the AAP test images.
 *
 * `weight` is only used by Sandbox to make the beam tilt. The weights are
 * deliberately distinct small integers so a 3rd grader can reason about them
 * once the teacher reveals them with the "peek weights" toggle.
 */
export const SHAPES: Record<ShapeId, Shape> = {
  cylinder: { id: 'cylinder', name: 'Can', color: '#d64545', weight: 2 },
  triangle: { id: 'triangle', name: 'Cone', color: '#3f9b46', weight: 3 },
  square: { id: 'square', name: 'Block', color: '#e0a020', weight: 1 },
  circle: { id: 'circle', name: 'Marble', color: '#3066be', weight: 4 },
  rectangle: { id: 'rectangle', name: 'Rectangle', color: '#e6c619', weight: 5 },
  hexagon: { id: 'hexagon', name: 'Hexagon', color: '#c0392b', weight: 6 },
}

export const ALL_SHAPE_IDS: ShapeId[] = ['cylinder', 'triangle', 'square', 'circle', 'rectangle', 'hexagon']

/** Per-shape weight overrides (Sandbox lets the child set these). */
export type WeightMap = Partial<Record<ShapeId, number>>

/** The default weights as a plain, editable map. */
export const DEFAULT_WEIGHTS: Record<ShapeId, number> = {
  cylinder: SHAPES.cylinder.weight,
  triangle: SHAPES.triangle.weight,
  square: SHAPES.square.weight,
  circle: SHAPES.circle.weight,
  rectangle: SHAPES.rectangle.weight,
  hexagon: SHAPES.hexagon.weight,
}

/** Weight of one shape, honoring an optional override map. */
export function shapeWeight(id: ShapeId, weights?: WeightMap): number {
  return weights?.[id] ?? SHAPES[id].weight
}

/** Sum the weights of a group (Sandbox only), honoring overrides. */
export function groupWeight(group: ShapeId[], weights?: WeightMap): number {
  return group.reduce((sum, id) => sum + shapeWeight(id, weights), 0)
}

/**
 * Given a balanced scale rule, compute a weight map that makes it physically
 * balance. Shapes not in the rule keep their default weights.
 */
export function computeBalancedWeights(scale: { left: ShapeId[]; right: ShapeId[] }): Record<ShapeId, number> {
  const weights = { ...DEFAULT_WEIGHTS }

  // Net coefficient per shape: leftCount − rightCount.
  const net: Partial<Record<ShapeId, number>> = {}
  for (const s of scale.left) net[s] = (net[s] ?? 0) + 1
  for (const s of scale.right) net[s] = (net[s] ?? 0) - 1

  let posSum = 0
  let negSum = 0
  const posShapes: ShapeId[] = []
  const negShapes: ShapeId[] = []

  for (const [id, coeff] of Object.entries(net) as [ShapeId, number][]) {
    if (coeff > 0) { posSum += coeff; posShapes.push(id) }
    else if (coeff < 0) { negSum += -coeff; negShapes.push(id) }
  }

  // Assign: positive-side shapes get weight = negSum, negative-side get posSum.
  // This guarantees Σ posCoeff * negSum === Σ |negCoeff| * posSum.
  for (const s of posShapes) weights[s] = negSum
  for (const s of negShapes) weights[s] = posSum

  return weights
}
