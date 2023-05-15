import React from 'react'

export default function SidebarSection(props) {
    const { title } = props;
    return (
        <div className='sidebar-section'>
            {/* Header */}
            <div className='sidebar-title-bar'>
                <h2>{title}</h2>
            </div>
            <div className='sidebar-group'>
                {props.children}
            </div>
        </div>
  )
}
