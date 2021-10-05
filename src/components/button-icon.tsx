import React from 'react';
import Icon from './icon';
import { IconType } from '../types';

const ButtonIcon = (props: {
	icon: IconType;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
	const { icon, onClick } = props;
	return (
		<button className="button-icon" onClick={onClick}>
			<Icon icon={icon} />
		</button>
	);
};

export default ButtonIcon;
