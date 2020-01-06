import {ContentBlock} from 'components/content';
import {generateWords} from 'components/libs';
import {FormNewsletter} from 'content/forms';
import React from 'react';

import * as Types from 'components/types';

type Props = {};

export const Newsletter = (props: Props) => {
	const base: string = 'newsletter';
	return (
		<div className={base}>
			<ContentBlock title="Subscribe to our newsletter" content={generateWords()} />
			<FormNewsletter />
		</div>
	);
};
