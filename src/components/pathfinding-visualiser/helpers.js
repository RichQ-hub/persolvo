// Algorithms
import Bfs from '../../lib/algorithms/Bfs';
import Dfs from '../../lib/algorithms/Dfs';
import Dijkstra from '../../lib/algorithms/Dijkstra';
import GreedyBestFirst from '../../lib/algorithms/GreedyBestFirst';
import AStar from '../../lib/algorithms/AStar';

export const DEFAULT_HEIGHT = 20;
export const DEFAULT_WIDTH = 30;

// Algorithm Descriptions.
export const algoDescriptions = {
    "BFS": `An algorithm that searches an unweighted graph or tree in a depth level manner. 
    Starting at the start cell, the algorithm visits all cells in the current depth before 
    moving onto the next.`,

    "DFS": `An algorithm that traverses down an unweighted graph as far as possible before backtracking.`,

    "Dijkstra": `Searches a weighted graph, which prioritises which path to explore. Instead of exploring all 
    node equally like BFS, we instead favour traversing to nodes that have a lower cost from the start cell.`,

    "Greedy Best First Search": `An informed search algorithm utilising a heauristic. Based on its heuristic function, it
    prioritises the next cell to visit based on the estimated (heuristic) distance it is from the goal.`,

    "A*": `An informed search algorithm that combines the benefits of both Greedy BFS and Dijkstra. It chooses paths/cells
    based on its actual distance from the start and its estimated (heuristic) distance to the goal.`,
}

/**
 * Runs the given algorithm.
 * @param {string} algorithm 
 * @param {array} grid 
 * @param {object} start 
 * @param {object} goal 
 * @returns 
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