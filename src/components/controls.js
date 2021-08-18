const Controls = ({ onClickControl }) => {
	return (
		<div className="keycaps">
			<p>
				Use or click on the following keys to guess the notes in the
				staff.
			</p>
			<div className="keycap" onClick={() => onClickControl(99)}>
				C
			</div>
			<div className="keycap" onClick={() => onClickControl(100)}>
				D
			</div>
			<div className="keycap" onClick={() => onClickControl(101)}>
				E
			</div>
			<div className="keycap" onClick={() => onClickControl(102)}>
				F
			</div>
			<div className="keycap" onClick={() => onClickControl(103)}>
				G
			</div>
			<div className="keycap" onClick={() => onClickControl(97)}>
				A
			</div>
			<div className="keycap" onClick={() => onClickControl(98)}>
				B
			</div>
		</div>
	);
};

export default Controls;
