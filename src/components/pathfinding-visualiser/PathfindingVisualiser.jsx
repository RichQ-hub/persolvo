import React, {useCallback, useState, useRef} from 'react'
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Cell from '../cell/Cell';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, createGrid } from './helpers'

// Icons.
import {ReactComponent as PlayButton} from '../../assets/icons/play-solid.svg' 

// Styles.
import './PathfindingVisualiser.css'

export default function PathfindingVisualiser() {
    const [grid, setGrid] = useState(createGrid(DEFAULT_HEIGHT, DEFAULT_WIDTH));
    const isMousePressed = useRef(false); // Changing refs won't trigger re-render.
    // const [isVisualising, setIsVisualising] = useState(false);

    /* MOUSE EVENTS -------------------------------------------------------------- */

    /* Note:
    useCallback caches a function between re-renders until its dependencies change. 
    If the dependencies list is empty, then we essentially don't have depencies, and
    thus on each re-render, the useCallback hook should return the same function
    REFERENCE each time.

    This is needed because anonymous functions (the one where we don't use useCallback),
    will always get a new function reference on every render (the function reference 
    changes), which will make memo() unable to work optimally for each cell.
    */

    const toggleWall = useCallback((row, col) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.slice();
            newGrid[row][col].isWall = true;
            return newGrid;
        });
    }, []);

    const handleMouseDown = useCallback((e, row, col) => {
        e.preventDefault() // Prevents default dragging.
        isMousePressed.current = true;

        // Toggle the wall.
        // const newGrid = toggleWall(grid, row, col);
        // setGrid(newGrid);
        toggleWall(row, col);

    }, [toggleWall]);

    const handleMouseUp = useCallback(() => {
        isMousePressed.current = false;
    }, []);

    const handleMouseEnter = useCallback((row, col) => {
        if (isMousePressed.current) {
            // Toggle the wall.
            // const newGrid = toggleWall(grid, row, col);
            // setGrid(newGrid);
            toggleWall(row, col);
        }
    }, [toggleWall]);

    return (
        <div className='pathfinding-visualiser'>
            {/* Header Section */}
            <Header />

            {/* Sidebar Section */}
            <Sidebar />

            <main>
                {/* Top Description Section */}
                <section className='algo-desc'>
                    <div className='item-desc'>
                        <h2>Item Selected</h2>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil 
                            nostrum veritatis aut, commodi facere saepe deleniti vero repellat 
                        </p>
                    </div>
                    <div className='divider'></div>
                    
                    {/* Algorithm Select Button */}
                    <div className='algo-select'>
                        <button>
                            <p>Algorithm</p>
                        </button>
                    </div>

                    {/* Play Button */}
                    <button className='algo-play'>
                        <PlayButton className='play-svg'/>
                    </button>
                </section>

                {/* Grid Section */}
                <div className='grid'>
                    {grid.map((row) => {
                        return (
                            row.map((cell, cellIdx) => {
                                const { row, col, isWall } = cell;
                                return (
                                    <Cell
                                        key={cellIdx}
                                        row={row}
                                        col={col}
                                        isWall={isWall}
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={handleMouseUp}
                                        onMouseEnter={handleMouseEnter}
                                    />
                                )
                            })
                        )
                    })}
                </div>

                {/* Clear Section */}

            </main>

        </div>
    )
}

// const toggleWall = (grid, row, col) => {
//     const newGrid = grid.slice();
//     newGrid[row][col].isWall = true;
//     return newGrid;
// };
