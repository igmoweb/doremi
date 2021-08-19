import KeyListener from './key-listener';

const Controls = ({ onPressNote }: { onPressNote: Function }) => {
	return (
		<>
			<KeyListener onKeyDown={onPressNote} />
			<div className="keycaps">
				<p>
					Use or click on the following keys to guess the notes in the
					staff.
				</p>
				<div className="keycap" onClick={() => onPressNote(99)}>
					C
				</div>
				<div className="keycap" onClick={() => onPressNote(100)}>
					D
				</div>
				<div className="keycap" onClick={() => onPressNote(101)}>
					E
				</div>
				<div className="keycap" onClick={() => onPressNote(102)}>
					F
				</div>
				<div className="keycap" onClick={() => onPressNote(103)}>
					G
				</div>
				<div className="keycap" onClick={() => onPressNote(97)}>
					A
				</div>
				<div className="keycap" onClick={() => onPressNote(98)}>
					B
				</div>
			</div>
		</>
	);
};

export default Controls;
