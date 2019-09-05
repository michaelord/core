import * as React from 'react';

import {GatsbyNavigation, GatsbyNavigationLevel} from 'components/gatsby';

import {Container, MatchMedia} from 'components/layout';
import {BackToTop, Social} from 'components/navigation';

import {Accordion} from 'components/accordion';

import {NavItem} from 'components/navigation';

import './Footer.scss';

export type FooterProps = {
	author: string;
	title: string;
	navTertiary: Array<NavItem>;
	navGlobal: Array<NavItem>;
	navSocial: Array<NavItem>;
};

export const Footer = (props: FooterProps) => {
	const {title, author, navTertiary, navGlobal, navSocial} = props;

	const mobile = () => {
		if (!navTertiary) {
			return null;
		}

		return (
			<div>
				{navTertiary.map((item, index) => {
					return (
						<Accordion key={`nav-${index}`} title={item.label}>
							{item.items && <GatsbyNavigationLevel items={item.items} />}
						</Accordion>
					);
				})}
			</div>
		);
	};

	const desktop = () => {
		if (!navTertiary) {
			return null;
		}

		return <GatsbyNavigation name="tertiary" layout="inline" items={navTertiary} />;
	};

	return (
		<>
			<footer className="page__footer">
				<Container>
					<div>
						<div>
							<a href="/" className="foo__logo">
								{title}
							</a>
						</div>
						<MatchMedia query="(max-width: 900px)" fallback={desktop()}>
							{mobile()}
						</MatchMedia>
					</div>
				</Container>
				<Container>
					<div>
						<Social items={navSocial} />
					</div>
					<GatsbyNavigation items={navGlobal} layout="inline" />
					<p>
						&copy;{new Date().getFullYear()}. All rights reserved. Site by {author}
					</p>
				</Container>
				<BackToTop />
			</footer>
		</>
	);
};
