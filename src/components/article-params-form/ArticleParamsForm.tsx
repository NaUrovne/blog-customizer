import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { UseOverlayClickClose } from 'src/ui/select/hooks/UseOverlayClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	onApply: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
}: ArticleParamsFormProps) => {
	const [localSettings, setLocalSettings] =
		useState<ArticleStateType>(currentSettings);
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	UseOverlayClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(localSettings);
	};

	const handleReset = () => {
		setLocalSettings(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localSettings.fontFamilyOption}
						onChange={(option) =>
							setLocalSettings({ ...localSettings, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localSettings.fontSizeOption}
						onChange={(option) =>
							setLocalSettings({ ...localSettings, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localSettings.fontColor}
						onChange={(option) =>
							setLocalSettings({ ...localSettings, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localSettings.backgroundColor}
						onChange={(option) =>
							setLocalSettings({ ...localSettings, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localSettings.contentWidth}
						onChange={(option) =>
							setLocalSettings({ ...localSettings, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
