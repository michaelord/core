import {Accordion, Toggle} from 'components/accordion';
import {Content} from 'components/editable';
import {Button} from 'components/form';
import {GatsbyNavigation, GatsbyNavigationLevel} from 'components/gatsby';
import IconMoonOutline from 'components/icon/moon-outline.inline.svg';
import IconMoon from 'components/icon/moon.inline.svg';
import {Container, MatchMedia} from 'components/layout';
import {getModifiers, replaceTokens} from 'components/libs';
import {BackToTop, hasChildren, isNavigationValid, Logo, NavItem, Social} from 'components/navigation';
import {ThemeConsumer} from 'components/theme';
import * as Types from 'components/types';
import {Theme} from 'components/types';
import React from 'react';
import './Footer.scss';

type Params = any;

export interface ChildFunction {
	(params: Params): JSX.Element | null;
}

export type FooterProps = {
	title?: Types.Text;
	logo?: Types.Image;
	theme?: Theme;
	copyright?: Types.Text;

	hasModeToggle?: boolean;

	children?: ChildFunction;

	navTertiary?: Array<NavItem>;
	navGlobal?: Array<NavItem>;
	navSocial?: Array<NavItem>;
};

export const Footer = (props: FooterProps) => {
	const base: string = 'page-footer';

	const {
		theme = 'dark',
		navTertiary,
		navGlobal,
		navSocial,
		copyright = '',
		title = '',
		logo,
		children,
		hasModeToggle = false,
	} = props;

	const hasTertiaryNavigation: boolean = !!(navTertiary && isNavigationValid(navTertiary));
	const hasChildNodes: boolean = !!(children && typeof children === 'function');

	const mobile = () => {
		if (!isNavigationValid(navTertiary) || !navTertiary) {
			return null;
		}

		if (!hasChildren(navTertiary)) {
			return desktop();
		}

		return (
			<Accordion>
				{navTertiary.map((item, index) => {
					const {items, ...rest} = item;

					if (items && rest.href) {
						items.unshift(rest);
					}

					return (
						<Toggle key={`nav-${index}`} title={item.label}>
							{items && <GatsbyNavigationLevel items={items} />}
						</Toggle>
					);
				})}
			</Accordion>
		);
	};

	const desktop = () => {
		if (!isNavigationValid(navTertiary)) {
			return null;
		}

		return <GatsbyNavigation name="tertiary" layout="inline" items={navTertiary} />;
	};

	const atts: object = {
		className: 'page__footer ' + getModifiers(base, {}),
		'data-theme': theme,
	};

	return (
		<footer {...atts}>
			<div className={`${base}__header`}>
				<Container>
					<div className={`inner ${base}__inner`}>
						<div className={`group ${base}__group`}>
							<Logo image={logo} title={title} />
							{/*<GatsbyNavigation items={navGlobal} layout="inline" />*/}
						</div>
						<div className={`group ${base}__group`}>
							{hasModeToggle && (
								<ThemeConsumer>
									{(context: any) => (
										<Button
											icon={context.theme === 'dark' ? IconMoon : IconMoonOutline}
											label={`${context.theme === 'dark' ? 'Disable' : 'Enable'} Dark Mode`}
											priority="secondary"
											onClick={(ev: MouseEvent) => {
												ev.preventDefault();
												context.setTheme(context.theme === 'light' ? 'dark' : 'light');
											}}
											type="button"
										/>
									)}
								</ThemeConsumer>
							)}

							<BackToTop isFixed={false} />
						</div>
					</div>
				</Container>
			</div>

			{(hasTertiaryNavigation || hasChildNodes) && (
				<div className={`${base}__main`}>
					<Container>
						<div className={`inner ${base}__inner`}>
							{hasTertiaryNavigation && (
								<MatchMedia query="(max-width: 900px)" fallback={desktop()}>
									{mobile()}
								</MatchMedia>
							)}
							{children && typeof children === 'function' && children({})}
						</div>
					</Container>
				</div>
			)}

			<div className={`${base}__footer`}>
				<Container>
					<div className={`inner ${base}__inner`}>
						<GatsbyNavigation items={navGlobal} layout="inline" />
						<Social items={navSocial} />
						<Content content={replaceTokens(copyright, {year: new Date().getFullYear()})} />
					</div>
				</Container>
			</div>
		</footer>
	);
};
