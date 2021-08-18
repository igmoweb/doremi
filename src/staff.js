import React, { useEffect } from 'react';
import abcjs from 'abcjs';

const Staff = ({ abcNotation, onClick }) => {
	useEffect(() => {
		var visualOptions = {
			clickListener: onClick,
			add_classes: true,
			scale: 3,
			paddingbottom: 0,
		};
		abcjs.renderAbc('paper', abcNotation, visualOptions);
	});

	return (
		<div style={{ width: '100%' }}>
			<div id="paper" style={{ width: '100%' }} />
		</div>
	);
};

export default Staff;
