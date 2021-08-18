import './App.scss';
import Staff from './staff';
import notes from './notes';
import { useCallback, useEffect, useState } from 'react';
import Controls from './components/controls';
import { Score } from './score';
import Audio from './components/audio';
import KeyListener from './components/key-listener';

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
	const [score, setScore] = useState(0);
	const [currentNote, setCurrentNote] = useState({ f: 0, note: '' });
	const [playSound, setPlaySound] = useState(false);
	const [refreshNote, setRefreshNote] = useState(true);

	const processNote = useCallback(
		(keyCode) => {
			const pressedNote = KEY_AND_NOTES[keyCode];
			if (!pressedNote) {
				return;
			}

			if (pressedNote === currentNote.note) {
				setScore(score + 1);
				setPlaySound(true);
			}
			setRefreshNote(true);
		},
		[currentNote.note, score]
	);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		if (refreshNote) {
			let newNote = currentNote;
			while (newNote.note === currentNote.note) {
				newNote = getRandomNote();
			}
			setRefreshNote(false);
			setCurrentNote(newNote);
		}
	}, [refreshNote]);
	/* eslint-enable react-hooks/exhaustive-deps */

	useEffect(() => {
		if (playSound) {
			setPlaySound(false);
		}
	}, [playSound]);

	if (!NOTES_SUBSET.length || currentNote.note === '') {
		return <div>Loading...</div>;
	}

	return (
		<div className="doremi">
			<KeyListener onKeyDown={processNote} />
			<Audio play={playSound} frequency={currentNote.f} />
			<Score score={score} />
			<Staff
				abcNotation={currentNote.note}
				onClick={() => setPlaySound(true)}
			/>
			<Controls onClickControl={processNote} />
		</div>
	);
}

export default App;
