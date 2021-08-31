import { useEffect, useState } from 'react';

const Score = ({ hits, missed }: { hits: number; missed: number }) => {
	const [moreInRow, setMoreInRow] = useState(-1);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		setMoreInRow(0);
	}, [missed]);

	useEffect(() => {
		setMoreInRow(moreInRow + 1);
	}, [hits]);
	/* eslint-enable react-hooks/exhaustive-deps */

	return (
		<div className="score">
			<div>Hits: {hits}</div>
			<div>Missed: {missed}</div>
			<div>More hits in a row: {moreInRow}</div>
		</div>
	);
};

export default Score;
