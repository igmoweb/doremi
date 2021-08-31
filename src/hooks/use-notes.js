import { useMemo } from 'react';
import notes from '../utils/notes';
import difficultiesOctavesMap from '../utils/difficulties-octaves-map';
import defaultSettings from '../utils/default-settings';

const useNotes = (options = {}) => {
	const args = {
		...defaultSettings,
		...options,
	};

	return useMemo(
		() =>
			Object.entries(notes)
				.filter(([noteKey]) => {
					const hasSharp = noteKey.indexOf('#') > -1;
					const hasFlat = noteKey.indexOf('b') > -1;
					const noteOctave = noteKey[noteKey.length - 1];

					const difficulty =
						args.difficulty || defaultSettings.difficulty;

					const clef = args.clef || defaultSettings.clef;

					// @ts-ignore
					const difficultyOctaves =
						difficultiesOctavesMap[clef][difficulty];

					console.log(difficultyOctaves);

					if (
						difficultyOctaves.indexOf(parseInt(noteOctave, 10)) < 0
					) {
						return false;
					}

					return !(
						(hasFlat && !args.withFlats) ||
						(hasSharp && !args.withSharps)
					);
				})
				.map(([_, note]) => {
					return note;
				}),
		[args.withFlats, args.withSharps, args.difficulty, args.clef]
	);
};

export default useNotes;
