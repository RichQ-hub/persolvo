import React, { memo } from 'react'

const Cell = memo((props) => {
    const { 
        row, 
        col, 
        cellType,
        onMouseDown, 
        onMouseUp, 
        onMouseEnter, 
        traversalState 
    } = props;

    return (
        <div 
            id={`cell-${row}-${col}`}
            className={`cell ${cellType ? cellType : ''} ${traversalState}`}
            onMouseDown={(e) => onMouseDown(e, row, col)}
            onMouseUp={() => onMouseUp()}
            onMouseEnter={() => onMouseEnter(row, col)}
        ></div>
    )
});

export default Cell;
