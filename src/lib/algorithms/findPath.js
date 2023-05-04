/**
 * Constructs the path from the goal to the start node.
 */
export default function findPath(start, goal, predMatrix) {
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