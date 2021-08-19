import './App.scss';
import Staff from './components/staff';
import { useCallback, useEffect, useState } from 'react';
import Controls from './components/controls';
import Score from './components/score';
import Audio from './components/audio';
import keyNotesMap from './utils/key-notes-map';
import useNotes from './hooks/use-notes';
import defaultSettings from './utils/default-settings';
import normalizeNote from './utils/normalize-note';
import Settings from './components/settings';

function App() {
	const [score, setScore] = useState(0);
	const [currentNote, setCurrentNote] = useState({ f: 0, note: '' });
	const [playSound, setPlaySound] = useState(false);
	const [refreshNote, setRefreshNote] = useState(true);
	const [settings, setSettings] = useState(defaultSettings);

	const notesSubSet = useNotes(settings);

	const getRandomNote = useCallback(() => {
		return notesSubSet[Math.floor(Math.random() * notesSubSet.length)];
	}, [notesSubSet]);

	const processNote = useCallback(
		(keyCode) => {
			const pressedNote = keyNotesMap[keyCode];
			if (!pressedNote) {
				return;
			}

			const normalizedCurrentNote = normalizeNote(currentNote.note);
			if (pressedNote === normalizedCurrentNote) {
				setScore(score + 1);
				setPlaySound(true);
			}
			setRefreshNote(true);
		},
		[currentNote.note, score]
	);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		if (refreshNote && notesSubSet.length > 0) {
			let newNote = currentNote;
			while (newNote.note === currentNote.note) {
				newNote = getRandomNote();
			}
			setRefreshNote(false);
			setCurrentNote(newNote);
		}
	}, [refreshNote, notesSubSet]);
	/* eslint-enable react-hooks/exhaustive-deps */

	useEffect(() => {
		if (playSound) {
			setPlaySound(false);
		}
	}, [playSound]);

	if (!notesSubSet.length || currentNote.note === '') {
		return <div>Loading...</div>;
	}

	return (
		<div className="doremi">
			<Audio play={playSound} frequency={currentNote.f} />
			<Score score={score} />
			<div className="row">
				<Staff
					abcNotation={currentNote.note}
					onClick={() => setPlaySound(true)}
				/>
			</div>
			<Controls onPressNote={processNote} />
			<Settings
				settings={settings}
				onChangeSetting={(setting, value) => {
					setSettings({
						...settings,
						[setting]: value,
					});
					setRefreshNote(true);
				}}
			/>
		</div>
	);
}

export default App;
