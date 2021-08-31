import { useEffect, ReactNode } from 'react';

const NOTICE_TIMEOUT = 300;

const Notice = ({
	children,
	onDismiss,
}: {
	children: ReactNode;
	onDismiss: Function;
}) => {
	useEffect(() => {
		const timeoutHandle = setTimeout(() => {
			onDismiss();
		}, NOTICE_TIMEOUT);
		return () => clearTimeout(timeoutHandle);
	});

	return <div className="notice">{children}</div>;
};

export default Notice;
