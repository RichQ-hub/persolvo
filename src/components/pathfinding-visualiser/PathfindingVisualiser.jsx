import React, {useState} from 'react'
import Grid from '../grid/Grid'
import { createGrid } from './helpers'

export default function PathfindingVisualiser() {
    const [grid] = useState(createGrid(4, 4));
    // const [isMousePressed, setIsMousePressed] = useState(false);
    // const [isVisualising, setIsVisualising] = useState(false);
    return (
        <div className='pathfinding-visualiser'>
            <Grid grid={grid}/>
        </div>
    )
}
