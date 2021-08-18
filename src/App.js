import './App.scss';
import SheetMusic from './sheetmusic';
import notes from './notes';
import { useCallback, useEffect, useState } from 'react';

const KEY_AND_NOTES = {
	99: 'C',
	67: 'C',
	100: 'D',
	68: 'D',
	101: 'E',
	69: 'E',
	102: 'F',
	70: 'F',
	103: 'G',
	71: 'G',
	97: 'A',
	98: 'B',
	65: 'A',
	66: 'B',
};

const NOTES_SUBSET = Object.entries(notes)
	.filter(([noteKey]) => {
		const hasSharp = noteKey.indexOf('#') > -1;
		const hasFlat = noteKey.indexOf('b') > -1;
		const octave = noteKey[noteKey.length - 1];
		return octave < 5 && octave > 3 && !hasSharp && !hasFlat;
	})
	.map(([_, note]) => {
		return note;
	});

const getRandomNote = () => {
	return NOTES_SUBSET[Math.floor(Math.random() * NOTES_SUBSET.length)];
};

function App() {
	const [pressedNumber, setPressedNumber] = useState(0);
	const [score, setScore] = useState(0);
	const [currentNote, setCurrentNote] = useState({ f: 0, note: '' });

	const handleKeyDown = useCallback(
		({ keyCode }) => {
			const pressedNote = KEY_AND_NOTES[keyCode];
			if (!pressedNote) {
				return;
			}
			if (pressedNote === currentNote.note) {
				setScore(score + 1);
				playNote();
			}
			setPressedNumber(pressedNumber + 1);
		},
		[currentNote.note, pressedNumber, score]
	);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		let newNote = currentNote;
		while (newNote.note === currentNote.note) {
			newNote = getRandomNote();
		}
		setCurrentNote(newNote);
	}, [pressedNumber]);
	/* eslint-enable react-hooks/exhaustive-deps */

	useEffect(() => {
		document.addEventListener('keypress', handleKeyDown, false);
		return () => {
			document.removeEventListener('keypress', handleKeyDown);
		};
	}, [currentNote.note, pressedNumber, handleKeyDown]);

	function playNote() {
		// abcelem,
		// tuneNumber,
		// classes,
		// analysis,
		// drag,
		// mouseEvent
		const context = new AudioContext();
		const frequency = currentNote.f;
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		oscillator.type = 'sine';
		oscillator.connect(gain);
		oscillator.frequency.value = frequency;
		gain.connect(context.destination);
		oscillator.start(0);
		gain.gain.exponentialRampToValueAtTime(
			0.00001,
			context.currentTime + 2
		);
	}

	if (!NOTES_SUBSET.length || currentNote.note === '') {
		return <div>Loading...</div>;
	}

	return (
		<div className="doremi">
			<p>Score: {score}</p>
			<SheetMusic abcNotation={currentNote.note} onClick={playNote} />
			<div className="keycaps">
				<p>Use the following keys to guess the notes in the staff:</p>
				<div className="keycap">C</div>
				<div className="keycap">D</div>
				<div className="keycap">E</div>
				<div className="keycap">F</div>
				<div className="keycap">G</div>
				<div className="keycap">A</div>
				<div className="keycap">B</div>
			</div>
		</div>
	);
}

export default App;
