import { useEffect } from 'react';

const Audio = ({ play, frequency }: { play: boolean; frequency: number }) => {
	useEffect(() => {
		if (play) {
			const audioContext = new AudioContext();
			const oscillator = audioContext.createOscillator();
			const gain = audioContext.createGain();

			oscillator.type = 'sine';
			oscillator.connect(gain);
			oscillator.frequency.value = frequency;

			gain.connect(audioContext.destination);
			gain.gain.exponentialRampToValueAtTime(
				0.00001,
				audioContext.currentTime + 2
			);

			oscillator.start(0);
		}
	}, [play, frequency]);

	return null;
};

export default Audio;
