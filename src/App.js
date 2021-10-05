import './App.scss';
import Staff from './components/staff';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Score from './components/score';
import Audio from './components/audio';
import keyNotesMap from './utils/key-notes-map';
import useNotes from './hooks/use-notes';
import defaultSettings from './utils/default-settings';
import normalizeNote from './utils/normalize-note';
import Notice from './components/notice';
import Icon from './components/icon';
import SidebarMenu from './components/sidebar-menu';
import ButtonIcon from './components/button-icon';
import KeyListener from './components/key-listener';
import { AppContext, useStore } from './store/context';
import { toggleMenu } from './store/actions';
import Controls from './components/controls';

function App() {
	const [hits, setHits] = useState(0);
	const [missed, setMissed] = useState(0);
	const [currentNote, setCurrentNote] = useState({ f: 0, note: '' });
	const [playSound, setPlaySound] = useState(false);
	const [refreshNote, setRefreshNote] = useState(true);
	const [settings, setSettings] = useState(defaultSettings);
	const [notice, setNotice] = useState(null);

	const [state, dispatch] = useStore();
	const { isMenuOpened } = state;

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
				setHits(hits + 1);
				setPlaySound(true);
				setNotice(true);
			} else {
				setNotice(false);
				setMissed(missed + 1);
			}
			setRefreshNote(true);
		},
		[currentNote.note, hits, setMissed, missed]
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
		<>
			<KeyListener onKeyDown={processNote} />
			{isMenuOpened && <div id="sidebar-overlay" />}
			<div className="doremi" id="doremi">
				<SidebarMenu
					open={isMenuOpened}
					onClose={() => {
						dispatch(toggleMenu());
					}}
					settings={settings}
					onChangeSetting={(setting, value) => {
						setSettings({
							...settings,
							[setting]: value,
						});
						setRefreshNote(true);
					}}
				/>
				<div id="header">
					<ButtonIcon
						icon="menu"
						onClick={() => {
							dispatch(toggleMenu());
						}}
					/>
					<h1>Learn to read music notes</h1>
				</div>
				<div id="content">
					<Audio play={playSound} frequency={currentNote.f} />
					<Score hits={hits} missed={missed} />
					<div className="row">
						<Staff
							abcNotation={currentNote.note}
							clef={settings.clef}
							onClick={() => setPlaySound(true)}
						/>
						{notice !== null && (
							<Notice onDismiss={() => setNotice(null)}>
								<Icon icon={notice ? 'yes' : 'no'} />
							</Notice>
						)}
					</div>
					<Controls />
				</div>
			</div>
		</>
	);
}

export default App;
