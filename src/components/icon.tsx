import Yes from '@material-ui/icons/CheckCircleOutline';
import No from '@material-ui/icons/HighlightOff';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import { IconType } from '../types';

const Icon = ({ icon }: { icon: IconType }) => {
	return (
		<>
			{icon === 'yes' && (
				<Yes style={{ color: 'green', fontSize: 120 }} />
			)}
			{icon === 'no' && <No style={{ color: 'red', fontSize: 120 }} />}
			{icon === 'menu' && <Menu />}
			{icon === 'close' && <Close />}
		</>
	);
};

export default Icon;
