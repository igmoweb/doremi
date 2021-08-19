import { useCallback, useEffect, useState } from 'react';

const KeyListener = ({ onKeyDown }: { onKeyDown: Function }) => {
	const [pressedCounter, setPressedCounter] = useState(0);
	const [lastPressedKey, setLastPressedKey] = useState(false);

	const handleKeyDown = useCallback(
		({ keyCode }) => {
			setPressedCounter(pressedCounter + 1);
			setLastPressedKey(keyCode);
		},
		[pressedCounter]
	);

	useEffect(() => {
		if (lastPressedKey) {
			onKeyDown(lastPressedKey);
			setLastPressedKey(false);
		}
	}, [lastPressedKey, onKeyDown]);

	useEffect(() => {
		document.addEventListener('keypress', handleKeyDown, false);
		return () => {
			document.removeEventListener('keypress', handleKeyDown);
		};
	}, [pressedCounter, handleKeyDown]);

	return null;
};

export default KeyListener;
