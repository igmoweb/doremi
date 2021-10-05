import React, { useContext, useReducer } from 'react';
import initialState from './initial-state';
import reducer from './reducers';

export const AppContext = React.createContext(initialState);

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={[state, dispatch]}>
			{props.children}
		</AppContext.Provider>
	);
};

export const useStore = () => {
	return useContext(AppContext);
};
