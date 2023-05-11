import React, {useCallback, useState, useRef} from 'react'
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Cell from '../cell/Cell';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, createGrid } from './helpers'

// Algorithms
import Bfs from '../../lib/algorithms/Bfs';
import Dfs from '../../lib/algorithms/Dfs';
import Dijkstra from '../../lib/algorithms/Dijkstra';
import GreedyBestFirst from '../../lib/algorithms/GreedyBestFirst';

// Icons.
import {ReactComponent as PlayButton} from '../../assets/icons/play-solid.svg' 

// Styles.
import './PathfindingVisualiser.css'

export default function PathfindingVisualiser() {
    const [grid, setGrid] = useState(createGrid(DEFAULT_HEIGHT, DEFAULT_WIDTH));

    const isMousePressed = useRef(false); // Changing refs won't trigger re-render.
    const isVisualising = useRef(false);
    const [selectedCellType, setSelectedCellType] = useState("wall");

    /* MOUSE EVENTS -------------------------------------------------------------------- */

    /* NOTE:
    useCallback caches a function between re-renders until its dependencies change. 
    If the dependencies list is empty, then we essentially don't have depencies, and
    thus on each re-render, the useCallback hook should return the same function
    REFERENCE each time.

    This is needed because anonymous functions (the one where we don't use useCallback),
    will always get a new function reference on every render (the function reference 
    changes), which will make memo() unable to work optimally for each cell.
    */
    
    // An updater function that updates a specific cell in the state grid. This is required
    // becuase if we try to update the cell inside the handler functions, we have to include
    // the grid as a dependency in the useCallBack hook. This breaks the memoisation for 
    // rendering each cell.
    const toggleCellType = useCallback((row, col) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.slice();
            newGrid[row][col].cellType = selectedCellType;
            return newGrid;
        });
    }, [selectedCellType]);

    const handleMouseDown = useCallback((e, row, col) => {
        if (isVisualising.current === true) {
            return
        }

        e.preventDefault() // Prevents default dragging.
        isMousePressed.current = true;

        // Toggle the wall.
        // const newGrid = toggleWall(grid, row, col);
        // setGrid(newGrid);
        toggleCellType(row, col);

    }, [toggleCellType]);

    const handleMouseUp = useCallback(() => {
        isMousePressed.current = false;
    }, []);

    const handleMouseEnter = useCallback((row, col) => {
        if (isMousePressed.current) {
            // Toggle the wall.
            // const newGrid = toggleWall(grid, row, col);
            // setGrid(newGrid);
            toggleCellType(row, col);
        }
    }, [toggleCellType]);

    /* GRID EVENTS -------------------------------------------------------------------- */

    const updateTraversalState = (cell, state) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.slice();
            newGrid[cell.row][cell.col].traversalState = state;
            return newGrid;
        });
    };

    const handlePlayAlgorithm = () => {
        isVisualising.current = true;

        let start = {
            row: 5,
            col: 5,
        };

        let goal = {
            row: DEFAULT_HEIGHT - 5,
            col: DEFAULT_WIDTH - 5,
        };

        // For now we just run BFS.
        const { visitedCellsInOrder, path } = GreedyBestFirst(grid, start, goal);

        animateAlgorithm(visitedCellsInOrder, path);

    };

    /**
     * Animate the visited cells in order and then the path.
     */
    const animateAlgorithm = (visitedCellsInOrder, path) => {
        const speed = 40;

        // Animate the visited nodes.
        let delay = 0;
        for (let i = 0; i < visitedCellsInOrder.length; i++) {
            // Every 20ms we schedule a node to be visited.
            let currCell = visitedCellsInOrder[i];
            setTimeout(() => {
                updateTraversalState(currCell, "visited");
            }, speed * i);
            delay += speed;
        }

        // Visualise the path after the nodes have been visited (hence why we delay it with setTimeout).
        setTimeout(() => {
            for (let i = 0; i < path.length; i++) {
                let currCell = path[i];
                setTimeout(() => {
                    updateTraversalState(currCell, "path")

                    // After all the nodes are traversed, we can edit the board again.
                    if (i === path.length - 1) {
                        isVisualising.current = false;
                    }
                }, speed * i);
            }
        }, delay);
    };

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
                    <button className='algo-play' onClick={handlePlayAlgorithm}>
                        <PlayButton className='play-svg'/>
                    </button>
                </section>

                {/* Grid Section */}
                <div className='grid'>
                    {grid.map((row) => {
                        return (
                            row.map((cell, cellIdx) => {
                                const { row, col, cellType, traversalState } = cell;
                                return (
                                    <Cell
                                        key={cellIdx}
                                        row={row}
                                        col={col}
                                        cellType={cellType}
                                        traversalState={traversalState}
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
