import React, { memo } from 'react'

const Cell = memo((props) => {
    const { 
        row, 
        col, 
        isWall, 
        isStart,
        isGoal,
        onMouseDown, 
        onMouseUp, 
        onMouseEnter, 
        traversalState 
    } = props;

    return (
        <div 
            id={`cell-${row}-${col}`}
            className={`cell ${isWall ? 'wall' : ''} ${traversalState} ${isStart ? 'start' : ''} ${isGoal ? 'goal' : ''}`}
            onMouseDown={(e) => onMouseDown(e, row, col)}
            onMouseUp={() => onMouseUp()}
            onMouseEnter={() => onMouseEnter(row, col)}
        ></div>
    )
});

export default Cell;
