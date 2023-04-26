import React, { memo } from 'react'

const Cell = memo((props) => {
    const { row, col, isWall, onMouseDown, onMouseUp, onMouseEnter } = props;
    return (
        <div 
            id={`cell-${row}-${col}`}
            className={`cell ${isWall ? 'wall' : ''}`}
            onMouseDown={(e) => onMouseDown(e, row, col)}
            onMouseUp={() => onMouseUp()}
            onMouseEnter={() => onMouseEnter(row, col)}
        ></div>
    )
});

export default Cell;
