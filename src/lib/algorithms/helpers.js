
// =============================================================================
// Find path.
// =============================================================================

/**
 * Constructs the path from the goal to the start node.
 */
export function findPath(start, goal, predMatrix) {
    // Don't add the goal to the path.
    const path = [];

    let predCell = predMatrix[goal.row][goal.col];
    while (!equalCells(predCell, start)) {
        path.push(predCell);
        predCell = predMatrix[predCell.row][predCell.col];
    }

    return path;
}

function equalCells(c1, c2) {
    return c1.row === c2.row && c1.col === c2.col;
}

// =============================================================================
// Matrices.
// =============================================================================

export function createBooleanMatrix(grid) {
    let rows = grid.length
    let cols = grid[0].length

    let boolMatrix = [];
    for (let r = 0; r < rows; r++) {
        let currRow = [];
        for (let c = 0; c < cols; c++) {
            currRow.push(false);
        }
        boolMatrix.push(currRow);
    }
    return boolMatrix;
}

export function createCellMatrix(grid) {
    let rows = grid.length
    let cols = grid[0].length

    let cellMatrix = [];
    for (let r = 0; r < rows; r++) {
        let currRow = [];
        for (let c = 0; c < cols; c++) {
            currRow.push(null);
        }
        cellMatrix.push(currRow);
    }
    return cellMatrix;
}

/**
 * Helper to create an array of integers, all initially set to 0.
 */
export function createIntegerArray(grid) {
    let rows = grid.length
    let cols = grid[0].length

    let integerMatrix = [];
    for (let r = 0; r < rows; r++) {
        let currRow = [];
        for (let c = 0; c < cols; c++) {
            currRow.push(0);
        }
        integerMatrix.push(currRow);
    }
    return integerMatrix;
}

// =============================================================================
// Etc.
// =============================================================================

/**
 * Checks if the current cell is within the bounds of the grid.
 */
export function isValidCell(grid, row, col) {
    let rows = grid.length
    let cols = grid[0].length

    return row >= 0 && row < rows && 
           col >= 0 && col < cols;
}

export function isCellWall(c) {
    return c.cellType === "wall";
}

export function isCellEqual(c1, c2) {
    return c1.row === c2.row && c1.col === c2.col;
}