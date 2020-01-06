import IconSearch from 'components/icon/search.inline.svg';
import {Modal} from 'components/modal';
import {UIButton} from 'components/ui';
import {FormSearch} from 'content/forms';
import React from 'react';
import {useState} from 'react';
import './Search.scss';

import * as Types from 'components/types';

type Props = {
	isModal?: boolean;
};

export const Search = (props: Props) => {
	const base: string = 'search';

	const {isModal = false} = props;

	const [modalOpen, setModalOpen] = useState(false);

	const onClick = (ev: any) => {
		ev.preventDefault();

		setModalOpen(true);
	};

	const onClose = () => {
		setModalOpen(false);
	};

	return (
		<div className={base}>
			{isModal ? (
				<>
					<UIButton onClick={onClick} size="md" icon={IconSearch} title="Search" />
					<Modal isActive={modalOpen} onClose={onClose} title="" header="" hasChrome={true} position="center">
						<FormSearch />
					</Modal>
				</>
			) : (
				<FormSearch />
			)}
		</div>
	);
};
