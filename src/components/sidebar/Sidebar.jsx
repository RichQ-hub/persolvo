import React from 'react'
import SidebarSection from './SidebarSection';
import SidebarItem from './SidebarItem';

// SVGs
import { ReactComponent as EraserIcon } from '../../assets/icons/eraser.svg';
import { ReactComponent as StartIcon } from '../../assets/icons/start.svg';
import { ReactComponent as GoalIcon } from '../../assets/icons/finish.svg';
import { ReactComponent as WallIcon } from '../../assets/icons/wall.svg';
import { ReactComponent as ChestIcon } from '../../assets/icons/treasure.svg';
import { ReactComponent as ForesIcon } from '../../assets/icons/forest.svg';

const cellTypes = ["Wall", "TreasureChest", "Forest"];

export default function Sidebar(props) {
	const { handleChangeCellType } = props;
	return (
		<aside className='sidebar'>
			<SidebarSection title="Eraser">
				<SidebarItem icon={<EraserIcon />} />
			</SidebarSection>

			<SidebarSection title="Start / End">
				<SidebarItem icon={<StartIcon />} />
				<SidebarItem icon={<GoalIcon />} />
			</SidebarSection>

			<SidebarSection title="Cell Types">
				<SidebarItem icon={<WallIcon />} />
				<SidebarItem icon={<ChestIcon />} />
				<SidebarItem icon={<ForesIcon />} />
			</SidebarSection>

		</aside>
	)
}
