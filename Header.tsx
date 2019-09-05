import * as React from 'react';

import {Container, MatchMedia} from 'components/layout';
import {Modal} from 'components/modal';

import './Header.scss';

import {NavItem} from 'components/navigation';

import {GatsbyNavigation} from 'components/gatsby';

export type HeaderProps = {
	title: string;
	navigation: Array<NavItem>;
};

export const Header = (props: HeaderProps) => {
	const {title, navigation} = props;

	const mobile = () => {
		return (
			<div className="foo">
				<a href="/" className="foo__logo">
					{title}
				</a>
				<div className="foo__nav">
					[hamburger]
					<Modal>
						<span>modal</span>
					</Modal>
				</div>
			</div>
		);
	};

	const desktop = () => {
		return (
			<div className="foo">
				<a href="/" className="foo__logo">
					{title}
				</a>
				<div className="foo__nav">
					<GatsbyNavigation items={navigation} layout="dropdown" />
				</div>
			</div>
		);
	};

	return (
		<header className="page__header">
			<Container>
				<MatchMedia query="(max-width: 900px)" fallback={desktop()}>
					{mobile()}
				</MatchMedia>
			</Container>
		</header>
	);
};
