import { UPDATE_TOGGLE_MENU_OPENED } from '../store/reducers';

export type OptionsType = {
	withSharps?: boolean;
	withFlats?: false;
	difficulty?: 'easy' | 'medium' | 'hard';
};

export type IconType = 'yes' | 'no' | 'menu' | 'close';

export type SettingsType = OptionsType & {
	clef: 'bass' | 'treble';
};

export type AppStateType = {
	isMenuOpened: boolean;
	settings: SettingsType;
};

export type ActionType = {
	type: typeof UPDATE_TOGGLE_MENU_OPENED;
	payload?: any;
};
