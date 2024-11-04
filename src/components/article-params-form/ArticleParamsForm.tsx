import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
//import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
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

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	// Не открывается сайдбар при использовании данного хука, не разобрался что не так и как реализовать закрытие сайдбара используя его
	//    useOutsideClickClose({
	//     isOpen,
	//     rootRef: sidebarRef,
	//     onChange: setIsOpen,
	//     onClose: () => setIsOpen(false),
	//   });

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		const rootElement = document.querySelector('main') as HTMLElement;

		rootElement.style.setProperty(
			'--font-family',
			settings.fontFamilyOption.value
		);
		rootElement.style.setProperty('--font-size', settings.fontSizeOption.value);
		rootElement.style.setProperty('--font-color', settings.fontColor.value);
		rootElement.style.setProperty('--bg-color', settings.backgroundColor.value);
		rootElement.style.setProperty(
			'--container-width',
			settings.contentWidth.value
		);
	};

	const handleReset = () => {
		setSettings(defaultArticleState);

		const rootElement = document.querySelector('main') as HTMLElement;
		rootElement.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		rootElement.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		rootElement.style.setProperty(
			'--font-color',
			defaultArticleState.fontColor.value
		);
		rootElement.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
		rootElement.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
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
						selected={settings.fontFamilyOption}
						onChange={(option) =>
							setSettings({ ...settings, fontFamilyOption: option })
						}
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(option) =>
							setSettings({ ...settings, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={settings.fontColor}
						onChange={(option) =>
							setSettings({ ...settings, fontColor: option })
						}
						placeholder='Выберите цвет шрифта'
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={settings.backgroundColor}
						onChange={(option) =>
							setSettings({ ...settings, backgroundColor: option })
						}
						placeholder='Выберите цвет фона'
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={settings.contentWidth}
						onChange={(option) =>
							setSettings({ ...settings, contentWidth: option })
						}
						placeholder='Выберите ширину контента'
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
