import React from 'react'

export default function DropdownItem(props) {
    const { algorithmName, handleMenuOpen, handleChangeAlgorithm } = props;

    return (
        <div 
            className='dropdown-item'
            // When the dropdown item is clicked, it closes the dropdown menu.
            onClick={() => {
                handleMenuOpen();
                handleChangeAlgorithm(algorithmName);
            }}
        >{algorithmName}</div>
    )
}
