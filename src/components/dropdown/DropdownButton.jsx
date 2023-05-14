import React, { useState } from 'react'
import DropdownMenu from './DropdownMenu';

export default function DropdownButton(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { selectedAlgorithm, handleChangeAlgorithm } = props;

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='algo-select'>
            <button onClick={handleMenuOpen}>
                <p>{selectedAlgorithm}</p>
            </button>

            {/* This returns the first falsy value, or the last one if all are true. So if 
            isMenuOpen is true, then we return DropdownMenu */}
            {
                isMenuOpen && 
                <DropdownMenu 
                    handleMenuOpen={handleMenuOpen}
                    handleChangeAlgorithm={handleChangeAlgorithm}
                />
            }
        </div>
    )
}
