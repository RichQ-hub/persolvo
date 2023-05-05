import { findPath, createBooleanMatrix, createCellMatrix, isValidCell, isCellWall } from "./helpers"

/**
 * Recursive implementation of DFS.
 * @param {*} grid 
 * @param {*} start - In the form {row, col}.
 * @param {*} goal - In the form {row, col}.
 * @returns Returns the following object:
 * {
 *      visitedNodesInOrder,
 *      path, (null if no path found)
 * }
 */
export default function Dfs(grid, startCoords, goalCoords) {
    let visitedCellsInOrder = [];

    // Start and goal cells.
    let startCell = grid[startCoords.row][startCoords.col];
    let goalCell = grid[goalCoords.row][goalCoords.col];

    // Visited matrix.
    const visited = createBooleanMatrix(grid);

    // Predecessor matrix.
    const predMatrix = createCellMatrix(grid);

    // Mark the starting cell as visited.
    visited[startCell.row][startCell.col] = true;

    // These arrays are used to get row and column numbers of the 4 adjacent
    // cells of the current cell.
    const rowNum = [-1, 0, 1, 0];
    const colNum = [0, 1, 0, -1];

    let path = [];
    if (dfsRecursive(grid, startCell, goalCell, visited, predMatrix, rowNum, colNum, visitedCellsInOrder)) {
        path = findPath(startCell, goalCell, predMatrix);
    }

    return {
        visitedCellsInOrder,
        path,
    }

};

function dfsRecursive(grid, cell, goal, visited, predMatrix, rowNum, colNum, visitedCellsInOrder) {
    // Push the current node into the visited cells list to return.
    visitedCellsInOrder.push(cell);

    // Recursively visit each neighbour.
    for (let i = 0; i < 4; i++) {
        let adjCellRow = cell.row + rowNum[i];
        let adjCellCol = cell.col + colNum[i];

        // Checks if the coordinates of the neighbour cell is valid (within bounds) 
        // before grabbing that cell from the grid below.
        if (!isValidCell(grid, adjCellRow, adjCellCol)) {
            continue;
        }

        let neighbour = grid[adjCellRow][adjCellCol];

        if (!isCellWall(neighbour) && !visited[adjCellRow][adjCellCol]) {
            // Mark the neighbour as visited.
            visited[adjCellRow][adjCellCol] = true;

            // Mark the predecessor of the neighbour as the current cell.
            predMatrix[adjCellRow][adjCellCol] = cell;

            // Check if the neighbour is the exit or not.
            if (neighbour.row === goal.row && neighbour.col === goal.col) {
                return true;
            } else if (dfsRecursive(grid, neighbour, goal, visited, predMatrix, rowNum, colNum, visitedCellsInOrder)) {
                return true;
            }
        }
    }

    return false;
};