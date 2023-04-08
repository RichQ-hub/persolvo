import React from 'react'

export default function Cell(props) {
    const { row, col, isWall } = props;
    return (
        <div 
            id={`cell-${row}-${col}`}
            className={`cell ${isWall ? 'wall' : ''}`}
        ></div>
    )
}
