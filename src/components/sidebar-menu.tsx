import ButtonIcon from './button-icon';
import React from 'react';
import Settings from './settings';

const SidebarMenu = ({
	open,
	onClose,
	settings,
	onChangeSetting,
}: {
	open: boolean;
	onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onChangeSetting: Function;
	settings: any;
}) => {
	return (
		open && (
			<div id="sidebar-menu">
				<ButtonIcon icon="close" onClick={onClose} />
				<Settings
					settings={settings}
					onChangeSetting={onChangeSetting}
				/>
			</div>
		)
	);
};
export default SidebarMenu;
