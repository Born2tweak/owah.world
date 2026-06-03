export function isGridNeighbor(
  tile: { gridRow: number; gridCol: number; id: string },
  reference: { gridRow: number; gridCol: number; id: string } | null | undefined,
): boolean {
  if (!reference || tile.id === reference.id) return false

  const rowDelta = Math.abs(tile.gridRow - reference.gridRow)
  const colDelta = Math.abs(tile.gridCol - reference.gridCol)

  return rowDelta <= 1 && colDelta <= 1 && (rowDelta + colDelta > 0)
}
