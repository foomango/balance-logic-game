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
}

export const ALL_SHAPE_IDS: ShapeId[] = ['cylinder', 'triangle', 'square', 'circle']

/** Per-shape weight overrides (Sandbox lets the child set these). */
export type WeightMap = Partial<Record<ShapeId, number>>

/** The default weights as a plain, editable map. */
export const DEFAULT_WEIGHTS: Record<ShapeId, number> = {
  cylinder: SHAPES.cylinder.weight,
  triangle: SHAPES.triangle.weight,
  square: SHAPES.square.weight,
  circle: SHAPES.circle.weight,
}

/** Weight of one shape, honoring an optional override map. */
export function shapeWeight(id: ShapeId, weights?: WeightMap): number {
  return weights?.[id] ?? SHAPES[id].weight
}

/** Sum the weights of a group (Sandbox only), honoring overrides. */
export function groupWeight(group: ShapeId[], weights?: WeightMap): number {
  return group.reduce((sum, id) => sum + shapeWeight(id, weights), 0)
}
