import PriorityQueue from "../data-structures/PriorityQueue"
import { 
    findPath, 
    createIntegerArray, 
    createCellMatrix, 
    createBooleanMatrix, 
    getWeights,
    isValidCell, 
    isCellWall, 
    isCellEqual
} from "./helpers"

// MIGHT STILL NOT WORK: It expands the frontier weirdly.

export default function Dijkstra(grid, startCoords, goalCoords) {
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

    // Weights of each cell.
    const weight = getWeights(grid);

    // Distance matrix to store the dist[] values for each cell from the start cell. 
    // All initially set to Infinity.
    const dist = createIntegerArray(grid);

    // Initially set the dist value for the start to 0.
    dist[startCell.row][startCell.col] = 0;

    // Add the source into the priority queue.
    pQueue.insert(startCell, 0);

    // Mark the source as visited.
    visited[startCell.row][startCell.col] = true;

    // For every cell that is not the start, we set its distance to infinity.
    const ROWS = grid.length
    const COLS = grid[0].length
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (!isCellEqual(grid[r][c], startCell)) {
                dist[r][c] = Infinity;
            }
        }
    }

    let found = false;

    const rowNum = [-1, 0, 0, 1];
    const colNum = [0, -1, 1, 0];

    // So long as there are nodes in the pqueue.
    while (!found && !pQueue.isEmpty()) {
        // Remove the cell with the smallest dist[][] value from the pqueue.
        let currCell = pQueue.remove();

        // Mark the current node as visited.
        visited[currCell.row][currCell.col] = true;

        // Add it to the visited cells in order.
        visitedCellsInOrder.push(currCell);

        if (isCellEqual(currCell, goalCell)) {
            // We have reached the goal cell.
            found = true;
        } else {
            // We consider all unvisited neighbours u of the current node v, and check if there 
            // exists a path to u that is shorter than the current value in dist[u].
            
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
                    
                    // Update the dist values for each neighbour.
                    let alt = dist[currCell.row][currCell.col] + weight[adjCellRow][adjCellCol];
                    if (alt < dist[adjCellRow][adjCellCol]) {
                        dist[adjCellRow][adjCellCol] = alt;

                        // Mark the predecessor of the neighbour as the current cell.
                        predMatrix[adjCellRow][adjCellCol] = currCell;

                        // Add the neighbour to the pqueue, with its updated dist[][] value.
                        pQueue.insert(neighbour, alt);
                    }
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
