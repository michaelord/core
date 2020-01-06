import {EventEmitter} from 'components/events';
import {GatsbyNavigation} from 'components/gatsby';
import IconMenu from 'components/icon/menu.inline.svg';
import {Container, MatchMedia} from 'components/layout';
import {getModifiers} from 'components/libs';
import {Modal} from 'components/modal';
import {Logo, NavItem, SubNav} from 'components/navigation';
import {UIButton} from 'components/ui';
import React, {useEffect, useState} from 'react';
import './Header.scss';
import {Search} from './Search';

import * as Types from 'components/types';

export type HeaderProps = {
	theme?: Types.Theme;
	logo?: Types.Image;
	title?: string;
	hasSearch?: boolean;
	navigation?: Array<NavItem>;
	secondaryNav?: Array<NavItem>;
	style?: 'fixed' | 'sticky' | 'overlay';
};

export const Header = (props: HeaderProps) => {
	const base: string = 'page-header';

	const {title = '', navigation, secondaryNav, logo, hasSearch = false, style, theme: defaultTheme} = props;

	const [modalOpen, setModalOpen] = useState(false);
	const [theme, setTheme] = useState(defaultTheme);

	const ref = React.createRef<HTMLDivElement>();

	const onClick = (ev: React.MouseEvent) => {
		ev.preventDefault();

		setModalOpen(true);
	};

	const onClose = () => {
		setModalOpen(false);
	};

	const atts: object = {
		className: 'page__header ' + getModifiers(base, {style}),
		'data-theme': theme,
		'data-auto-theme': style === 'overlay',
		ref,
	};

	let lastScroll: number = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);

	const scroll = (ev: Event) => {
		const pY: number = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
		const dir: number = pY > lastScroll ? 1 : -1;

		if (ref && ref.current) {
			// get the details about this module
			const details: any = ref.current.getBoundingClientRect();
			const isOffscreen: boolean = pY > details.height;

			if (isOffscreen) {
				ref.current.classList.add('scrolled');
			} else {
				ref.current.classList.remove('scrolled');
			}

			if (dir === -1) {
				ref.current.classList.remove('dirup');
				ref.current.classList.add('dirdown');
			} else {
				ref.current.classList.add('dirup');
				ref.current.classList.remove('dirdown');
			}
		}

		lastScroll = pY;
	};

	const resize = (ev: Event) => {};

	const updateTheme = (theme: Types.Theme) => {
		setTheme(theme);
	};

	useEffect(() => {
		if (ref && ref.current && ref.current.firstChild) {
			document.documentElement.style.setProperty('--header-height', `${ref.current.firstChild.offsetHeight}px`);
		}

		// TODO: potentially change this on an interval if the next element is a carousel...
		// if the navigation is supposed to overlap the content below it

		try {
			if (style === 'overlay' && ref && ref.current) {
				// get the next sibling

				const next = ref.current.nextSibling;

				if (next) {
					// attempt to pull the theme off the next element
					const theme = next.getAttribute('data-theme');

					if (theme) {
						setTheme(theme);
					}

					EventEmitter.subscribe(`theme-change`, updateTheme);
				}
			}
		} catch (e) {}

		window.addEventListener('scroll', scroll);
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('scroll', scroll);
			window.removeEventListener('resize', resize);
		};
	});

	const mobile = () => {
		return (
			<>
				<Logo image={logo} title={title} />

				{navigation && (
					<div>
						<UIButton size="lg" icon={IconMenu} onClick={onClick} />
						<Modal
							isActive={modalOpen}
							onClose={onClose}
							title=""
							header=""
							hasChrome={true}
							position="right"
						>
							<GatsbyNavigation items={navigation} layout="default" />
						</Modal>
					</div>
				)}
			</>
		);
	};

	const desktop = () => {
		return (
			<>
				<Logo image={logo} title={title} />
				{navigation && (
					<div className={`group ${base}__group`}>
						<GatsbyNavigation items={navigation} layout="horizontal" megaNav />
						{hasSearch && <Search isModal={true} />}
					</div>
				)}
			</>
		);
	};

	return (
		<header {...atts}>
			<div className={`${base}__body`}>
				<div className={`${base}__header`}>
					<Container>
						<div className={`inner ${base}__inner`}>
							<MatchMedia query="(max-width: 900px)" fallback={desktop()}>
								{mobile()}
							</MatchMedia>
						</div>
					</Container>
				</div>
				{secondaryNav && (
					<div className={`${base}__secondary`}>
						<Container>
							<SubNav items={secondaryNav} />
						</Container>
					</div>
				)}
			</div>
		</header>
	);
};
