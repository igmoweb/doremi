import Yes from '@material-ui/icons/CheckCircleOutline';
import No from '@material-ui/icons/HighlightOff';

const Icon = ({ icon }: { icon: 'yes' | 'no' }) => {
	return (
		<>
			{icon === 'yes' && (
				<Yes style={{ color: 'green', fontSize: 120 }} />
			)}
			{icon === 'no' && <No style={{ color: 'red', fontSize: 120 }} />}
		</>
	);
};

export default Icon;
