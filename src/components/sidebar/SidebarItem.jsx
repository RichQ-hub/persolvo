import React from 'react'

export default function SidebarItem(props) {
    const { name, icon, selectedItem, handleChangeCellType } = props;

    /* 
    Onclick handler: Whenever this sidebar item is clicked, we set the current celltype 
    to the name we set to this particular sidebar item.
    */

    return (
        <div 
            className={`sidebar-item ${selectedItem === name ? "selected": ""}`}
            onClick={() => handleChangeCellType(name)}
        >
            {icon}
        </div>
    )
}
