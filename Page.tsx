import React from 'react';

import {graphql, useStaticQuery} from 'gatsby';

import {Header} from './Header';
import {Footer} from './Footer';

import {PreHeader} from 'components/pre-header';

// @ts-ignore
import Contact from 'blocks/Contact';

import {CookiePolicy} from 'components/cookie-policy';
import {Theme} from 'components/types';

import {Helmet} from 'react-helmet';

import '../../styles/application.scss';
import './Page.scss';

import {navSocial, navGlobal, navTertiary, navPrimary} from '../../navigation';

export type PageProps = {
	children?: React.ReactNode;
	theme?: Theme;
	title: string;
	hasHeader?: boolean;
	hasFooter?: boolean;
};

import {NotificationProvider} from 'components/notification';

// import { ToastProvider, useToasts } from 'react-toast-notifications'

export const Page = (props: PageProps) => {

	const {children, theme, title = 'Default Title', hasHeader = true, hasFooter = true} = props;

	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					author
				}
			}
		}
	`);

	return (
		<NotificationProvider>
			<div className="page">
				<Helmet title={`${title} - ${data.site.siteMetadata.title}`}>
					<meta charSet="utf-8" />
				</Helmet>

				<CookiePolicy
					title="Cookie Policy"
					content={`<p>We use cookies to give you the best possible website experience. By using [website], you agree to our <a href="/privacy-policy/">Privacy Policy</a>.</p>`}
					accept="OK, Got it!"
				/>

				<PreHeader />

				{hasHeader && <Header title={data.site.siteMetadata.title} navigation={navPrimary} />}

				<main className="page__body" data-theme={theme}>
					{children}
				</main>

				<Contact />

				{hasFooter && (
					<Footer
						title={data.site.siteMetadata.title}
						author={data.site.siteMetadata.author}
						navSocial={navSocial}
						navTertiary={navTertiary}
						navGlobal={navGlobal}
					/>
				)}
			</div>
		</NotificationProvider>
	);
};
