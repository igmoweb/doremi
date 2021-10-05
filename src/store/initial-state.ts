import { AppStateType } from '../types';
import defaultSettings from '../utils/default-settings';

const initialState: AppStateType = {
	isMenuOpened: false,
	settings: defaultSettings,
};

export default initialState;
