import { ActionType, AppStateType } from '../types';

export const UPDATE_TOGGLE_MENU_OPENED = 'UPDATE_TOGGLE_MENU_OPENED';

const reducer = (state: AppStateType, action: ActionType) => {
	if (action.type === UPDATE_TOGGLE_MENU_OPENED) {
		return {
			...state,
			isMenuOpened: !state.isMenuOpened,
		};
	}
	return state;
};

export default reducer;
