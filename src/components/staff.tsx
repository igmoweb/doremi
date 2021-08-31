import { useEffect } from 'react';

// @ts-ignore
import abcjs from 'abcjs';

const Staff = ({
	abcNotation,
	clef,
	onClick,
}: {
	abcNotation: string;
	clef: 'treble' | 'bass';
	onClick: Function;
}) => {
	useEffect(() => {
		const notation = `
K:clef=${clef}
${abcNotation}
		`;
		abcjs.renderAbc('staff', notation, {
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
