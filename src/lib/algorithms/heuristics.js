/**
 * Admissable heuristics for 2D grids.
 */

export function heuristicManhattan(cell1, cell2) {
    return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
}

export function heuristicEuclidean(cell1, cell2) {
    return Math.sqrt(Math.pow(cell1.row - cell2.row, 2) + Math.pow(cell1.col - cell2.col, 2));
}