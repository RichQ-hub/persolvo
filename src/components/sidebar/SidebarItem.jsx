import React from 'react'

export default function SidebarItem(props) {
    const { icon } = props;

    return (
        <div className='sidebar-item'>
            {icon}
        </div>
    )
}
