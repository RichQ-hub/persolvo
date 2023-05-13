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

import { heuristicManhattan } from "./heuristics";

export default function AStar(grid, startCoords, goalCoords) {
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

    // Mark the source as visited, and add it to the pQueue.
    pQueue.insert(startCell, 0);
    visited[startCell.row][startCell.col] = true;

    // Mark the dist for the start cell as 0.
    dist[startCell.row][startCell.col] = 0;

    // Setup dist for all cells except the start as infinity.
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

    while (!found && !pQueue.isEmpty()) {
        // Remove the cell with the least f(n) value (which is the combination of both 
        // the heuristic value and its cost so far (dist)).

        // TEST
        console.log("nice")

        const currCell = pQueue.remove();

        // Add the curr cell into the visited cells in order.
        visitedCellsInOrder.push(currCell);

        if (isCellEqual(currCell, goalCell)) {
            // We have reached the goal cell.
            found = true;
        } else {
            // Consider all the neighbours of the current cell.

            for (let neighbour of getNeighbours(grid, currCell)) {

                if (!isCellWall(neighbour) && !visited[neighbour.row][neighbour.col]) {
                    // If the neighbour cell is valid, not a wall and has not 
                    // been visited yet.

                    let newCost = dist[currCell.row][currCell.col] + weight[neighbour.row][neighbour.col];
                    if (newCost < dist[neighbour.row][neighbour.col]) {
                        dist[neighbour.row][neighbour.col] = newCost;

                        visited[currCell.row][currCell.col] = true;

                        // Mark the pred of the neighbour as the current cell.
                        predMatrix[neighbour.row][neighbour.col] = currCell;

                        // Calculate the heuristic for the neighbour cell to the goal.
                        let heuristicVal = heuristicManhattan(neighbour, goalCell);
                        const priority = newCost + heuristicVal;

                        // Add the neighbour along with its heuristic.
                        pQueue.insert(neighbour, priority);

                        printScores(neighbour, dist, heuristicVal, priority)
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

function getNeighbours(grid, cell) {
    let neighbours = [];

    const rowNum = [-1, 0, 0, 1];
    const colNum = [0, -1, 1, 0];

    for (let i = 0; i < 4; i++) {
        let adjCellRow = cell.row + rowNum[i];
        let adjCellCol = cell.col + colNum[i];

        // Checks if the coordinates of the neighbour cell is valid (within bounds) 
        // before grabbing that cell from the grid below.
        if (isValidCell(grid, cell.row, cell.col)) {
            neighbours.push(grid[adjCellRow][adjCellCol]);
        }
    }

    return neighbours;
}

function printScores(c, dist, hScore, fScore) {
    console.log(`Cell = ${c.row} - ${c.col}`);
    console.log(`dist (g Score) = ${dist[c.row][c.col]}`);
    console.log(`heuristic = ${hScore}`);
    console.log(`f score = ${fScore}`);
    console.log('');
}