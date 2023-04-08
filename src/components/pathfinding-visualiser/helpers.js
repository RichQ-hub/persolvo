
export const createGrid = (numRows, numCols) => {
    let grid = [];
    for (let r = 0; r < numRows; r++) {
        let currRow = [];
        for (let c = 0; c < numCols; c++) {
            currRow.push(createCell(r, c));
        }
        grid.push(currRow);
    }
    return grid;
}

const createCell = (row, col) => {
    return {
        row,
        col,
        isWall: false
    }
}