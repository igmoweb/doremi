import difficultiesOctavesMap from '../utils/difficulties-octaves-map';

type SettingsType = {
	difficulty: 'easy' | 'medium' | 'hard';
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
					{Object.keys(difficultiesOctavesMap).map(
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
		</form>
	);
};

export default Settings;
