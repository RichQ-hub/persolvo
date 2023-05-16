import React from 'react'
import SidebarSection from './SidebarSection';
import SidebarItem from './SidebarItem';

// SVGs
import { ReactComponent as EraserIcon } from '../../assets/icons/eraser.svg';
import { ReactComponent as StartIcon } from '../../assets/icons/start.svg';
import { ReactComponent as GoalIcon } from '../../assets/icons/finish.svg';
import { ReactComponent as WallIcon } from '../../assets/icons/wall.svg';
import { ReactComponent as ChestIcon } from '../../assets/icons/treasure.svg';
import { ReactComponent as ForestIcon } from '../../assets/icons/forest.svg';

export default function Sidebar(props) {
	const { handleChangeCellType, selectedItem } = props;
	return (
		<aside className='sidebar'>
			<SidebarSection title="Eraser" num="1">
				<SidebarItem 
					name="eraser" 
					icon={<EraserIcon />}
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
			</SidebarSection>

			<SidebarSection title="Start / End" num="2">
				<SidebarItem 
					name="start" 
					icon={<StartIcon />} 
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
				<SidebarItem 
					name="goal" 
					icon={<GoalIcon />}
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
			</SidebarSection>

			<SidebarSection title="Cell Types" num="3">
				<SidebarItem 
					name="wall" 
					icon={<WallIcon />}
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
				<SidebarItem 
					name="chest" 
					icon={<ChestIcon />}
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
				<SidebarItem 
					name="forest" 
					icon={<ForestIcon />}
					selectedItem={selectedItem}
					handleChangeCellType={handleChangeCellType}
				/>
			</SidebarSection>

		</aside>
	)
}
