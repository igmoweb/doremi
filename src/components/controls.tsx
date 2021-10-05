import keyboard from '../images/keyboard.png';
const Controls = () => {
	return (
		<div className="controls">
			<h2>Controls</h2>
			<p>Use your keyboard to guess the notes in the staff.</p>
			<img src={keyboard} alt="" />
		</div>
	);
};

export default Controls;
