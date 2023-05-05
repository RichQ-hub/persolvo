import Queue from "../data-structures/Queue"; 
import { findPath, createBooleanMatrix, createCellMatrix, isValidCell, isCellWall } from "./helpers"

/**
 * BFS algorithm.
 * @param {*} grid 
 * @param {*} start - In the form {row, col}.
 * @param {*} goal - In the form {row, col}.
 * @returns Returns the following object:
 * {
 *      visitedNodesInOrder,
 *      path, (null if no path found)
 * }
 */
export default function Bfs(grid, start, goal) {
    let visitedCellsInOrder = [];

    // Start and goal cells.
    let startCell = grid[start.row][start.col];
    let goalCell = grid[goal.row][goal.col];

    // Queue initialised.
    let queue = Queue();
    let found = false;

    // Visited array.
    const visited = createBooleanMatrix(grid);

    // Predecessor array.
    const predMatrix = createCellMatrix(grid);

    // Mark the starting cell as visited and add it to the queue.
    queue.enqueue(startCell);

    // These arrays are used to get row and column numbers of the 4 adjacent
    // cells of the current cell.
    const rowNum = [-1, 0, 1, 0];
    const colNum = [0, 1, 0, -1];

    while (!found && queue.size() !== 0) {
        let currCell = queue.dequeue();

        // Push the current node into the visited cells list to return.
        visitedCellsInOrder.push(currCell);

        if (currCell.row === goalCell.row && currCell.col === goalCell.col) {
            // The goal cell is reachable.
            found = true;
        } else {
            // Loop through the 4 adjacent cells.
            
            for (let i = 0; i < 4; i++) {
                let adjCellRow = currCell.row + rowNum[i];
                let adjCellCol = currCell.col + colNum[i];

                // Checks if the coordinates of the neighbour cell is valid (within bounds) 
                // before grabbing that cell from the grid below.
                if (!isValidCell(grid, adjCellRow, adjCellCol)) {
                    continue;
                }

                let neighbour = grid[adjCellRow][adjCellCol];

                if (!isCellWall(neighbour) && !visited[adjCellRow][adjCellCol]) {
                    // If the neighbour cell is valid, not a wall and has not 
                    // been visited yet.
                    
                    // Mark the neighbour as visited.
                    visited[adjCellRow][adjCellCol] = true;

                    // Mark the predecessor of the neighbour as the current cell.
                    predMatrix[adjCellRow][adjCellCol] = currCell;

                    // Enqueue the neighbour.
                    queue.enqueue(neighbour);
                }
            }
        }
    }

    let path = null;
    if (found) {
        path = findPath(startCell, goalCell, predMatrix);
    }

    console.log(visitedCellsInOrder);

    return {
        visitedCellsInOrder,
        path,
    }
}

