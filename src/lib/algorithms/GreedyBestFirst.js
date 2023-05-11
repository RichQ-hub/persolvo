import PriorityQueue from "../data-structures/PriorityQueue"
import { 
    findPath, 
    createCellMatrix, 
    createBooleanMatrix, 
    isValidCell, 
    isCellWall, 
    isCellEqual
} from "./helpers"

import { heuristicManhattan } from "./heuristics";

/**
 * Greedy Best First Search Algorithm. (We don't care about weights).
 */
export default function GreedyBestFirst(grid, startCoords, goalCoords) {
    let visitedCellsInOrder = [];

    // Start and goal cells.
    let startCell = grid[startCoords.row][startCoords.col];
    let goalCell = grid[goalCoords.row][goalCoords.col];

    // Priority queue.
    const pQueue = PriorityQueue();

    // Pred Matrix.
    const predMatrix = createCellMatrix(grid);

    // Visited Matrix.
    const visited = createBooleanMatrix(grid);

    // Add the start into the pQueue.
    pQueue.insert(startCell, 0);
    visited[startCell.row][startCell.col] = true;

    const rowNum = [-1, 0, 1, 0];
    const colNum = [0, 1, 0, -1];

    let found = false;
    while (!found && !pQueue.isEmpty()) {
        // Remove the cell from the pQueue with the lowest priority (meaning it has the lowest heuristic
        // and thus has the least estimated distance to the goal).
        const currCell = pQueue.remove();

        // Mark the current cell as visited.
        // visited[currCell.row][currCell.col] = true;

        // Add the curr cell into the visited cells in order.
        visitedCellsInOrder.push(currCell);

        if (isCellEqual(currCell, goalCell)) {
            // We foudn found the goal.
            found = true;
        } else {
            // Consider all the neighbours of the current cell.

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

                    visited[adjCellRow][adjCellCol] = true;

                    // Mark the pred of the neighbour as the current cell.
                    predMatrix[adjCellRow][adjCellCol] = currCell;
                    
                    // Calculate the heuristic for the neighbour cell to the goal.
                    const priority = heuristicManhattan(neighbour, goalCell);

                    // Add the neighbour along with its heuristic.
                    pQueue.insert(neighbour, priority);
                }
            }
        }
    }

    let path = [];
    if (found) {
        path = findPath(startCell, goalCell, predMatrix);
    }

    return {
        visitedCellsInOrder, 
        path,
    }
}