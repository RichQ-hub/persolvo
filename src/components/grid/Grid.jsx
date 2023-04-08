import React from 'react'
import Cell from '../cell/Cell'

export default function Grid(props) {
    const { grid } = props;

    return (
        <section className='grid'>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((cell, cellIdx) => {
                            const { row, col, isWall } = cell;
                            return (
                                <Cell
                                    key={cellIdx}
                                    row={row}
                                    col={col}
                                    isWall={isWall}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </section>
    )
    // For each row in the grid, we create a new div to store each cell in the current row. The same applies
    // for each cell.
     

    // Note: Remember that to render lists, we have to ensure that each list item has a key attribute.
}
