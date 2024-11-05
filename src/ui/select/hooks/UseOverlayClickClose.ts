import { useEffect } from 'react';

type UseOverlayClickCloseProps = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onChange: (isOpen: boolean) => void;
	onClose?: () => void;
};

export const UseOverlayClickClose = ({
	isOpen,
	rootRef,
	onChange,
	onClose,
}: UseOverlayClickCloseProps) => {
	useEffect(() => {
		const handleClickOverlay = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onChange(false);
				if (onClose) {
					onClose();
				}
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOverlay);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOverlay);
		};
	}, [isOpen, rootRef, onChange, onClose]);
};
