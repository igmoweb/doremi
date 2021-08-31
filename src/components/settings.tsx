import difficultiesOctavesMap from '../utils/difficulties-octaves-map';

type SettingsType = {
	difficulty: 'easy' | 'medium' | 'hard';
	clef: 'treble' | 'bass';
};

const Settings = ({
	settings,
	onChangeSetting,
}: {
	settings: SettingsType;
	onChangeSetting: Function;
}) => {
	return (
		<form className="settings">
			<h2>Settings</h2>
			<div>
				<label htmlFor="difficulty">Difficulty</label>
				<select
					id="difficulty"
					onChange={({ target }) =>
						onChangeSetting('difficulty', target.value)
					}
					value={settings.difficulty}
				>
					{Object.keys(difficultiesOctavesMap[settings.clef]).map(
						(difficulty: string) => {
							return (
								<option value={difficulty} key={difficulty}>
									{difficulty.charAt(0).toUpperCase() +
										difficulty.slice(1)}
								</option>
							);
						}
					)}
				</select>
			</div>
			<div>
				<label htmlFor="clef">Clef</label>
				<select
					id="clef"
					onChange={({ target }) =>
						onChangeSetting('clef', target.value)
					}
					value={settings.clef}
				>
					{Object.keys(difficultiesOctavesMap).map((clef: string) => {
						return (
							<option value={clef} key={clef}>
								{clef.charAt(0).toUpperCase() + clef.slice(1)}
							</option>
						);
					})}
				</select>
			</div>
		</form>
	);
};

export default Settings;
