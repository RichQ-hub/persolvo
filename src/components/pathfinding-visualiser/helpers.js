// Algorithms
import Bfs from '../../lib/algorithms/Bfs';
import Dfs from '../../lib/algorithms/Dfs';
import Dijkstra from '../../lib/algorithms/Dijkstra';
import GreedyBestFirst from '../../lib/algorithms/GreedyBestFirst';
import AStar from '../../lib/algorithms/AStar';

export const DEFAULT_HEIGHT = 20;
export const DEFAULT_WIDTH = 30;

/**
 * Runs the given algorithm.
 * @param {string} algorithm 
 */
export const runAlgorithm = (algorithm, grid, start, goal) => {
    switch (algorithm) {
        case "BFS":
            return Bfs(grid, start, goal);
        case "DFS":
            return Dfs(grid, start, goal);
        case "Dijkstra":
            return Dijkstra(grid, start, goal);
        case "Greedy Best First Search":
            return GreedyBestFirst(grid, start, goal);
        case "A*":
            return AStar(grid, start, goal);
        default:
            return Bfs(grid, start, goal);
    }
}

export const createGrid = (numRows, numCols) => {
    let grid = [];
    for (let r = 0; r < numRows; r++) {
        let currRow = [];
        for (let c = 0; c < numCols; c++) {
            currRow.push(createCell(r, c));
        }
        grid.push(currRow);
    }

    // TEST FOR NOW: Hard coding the start and end cells.
    grid[5][5].cellType = "start";
    grid[DEFAULT_HEIGHT - 5][DEFAULT_WIDTH - 5].cellType = "goal";

    return grid;
}

const createCell = (row, col) => {
    return {
        row,
        col,
        cellType: undefined,
        traversalState: "unvisited",
    }
}

/**
 * Clears all cell types and traversal states, except for the start and goal cells.
 */
export const clearGrid = (grid) => {
    const newGrid = grid.slice();
    for (let r = 0; r < DEFAULT_HEIGHT; r++) {
        for (let c = 0; c < DEFAULT_WIDTH; c++) {
            if (newGrid[r][c].cellType !== "start" && newGrid[r][c].cellType !== "goal") {
                newGrid[r][c].traversalState = "unvisited";
                newGrid[r][c].cellType = undefined;
            }
        }
    }
    return newGrid;
}

/**
 * Clears cell traversal states.
 */
export const clearPath = (grid) => {
    const newGrid = grid.slice();
    for (let r = 0; r < DEFAULT_HEIGHT; r++) {
        for (let c = 0; c < DEFAULT_WIDTH; c++) {
            newGrid[r][c].traversalState = "unvisited";
        }
    }
    return newGrid;
}