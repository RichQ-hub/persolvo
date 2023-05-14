import React from 'react'
import DropdownItem from './DropdownItem'

export default function DropdownMenu(props) {
    const { handleMenuOpen, handleChangeAlgorithm } = props;
    return (
        <div className='dropdown'>
            {/* This is the default selection. */}
            <DropdownItem 
                algorithmName="Select Algorithm" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
            <DropdownItem 
                algorithmName="BFS" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
            <DropdownItem 
                algorithmName="DFS" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
            <DropdownItem 
                algorithmName="Dijkstra" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
            <DropdownItem 
                algorithmName="Greedy Best First Search" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
            <DropdownItem 
                algorithmName="A*" 
                handleMenuOpen={handleMenuOpen}
                handleChangeAlgorithm={handleChangeAlgorithm}
            />
        </div>
    )
}
