import { useEffect } from 'react';

// @ts-ignore
import abcjs from 'abcjs';

const Staff = ({
	abcNotation,
	onClick,
}: {
	abcNotation: string;
	onClick: Function;
}) => {
	useEffect(() => {
		abcjs.renderAbc('staff', abcNotation, {
			clickListener: onClick,
			add_classes: true,
			scale: 3,
			paddingbottom: 0,
		});
	});

	return (
		<div className="staff-wrap">
			<div id="staff" className="staff" />
		</div>
	);
};

export default Staff;
