import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
	return (
		<Menu>
			<Link route="/">
				<a className="item">Rifado.io</a>
			</Link>
			<Menu.Menu position="right">
				<Link route="/">
					<a className="item">Raffles</a>
				</Link>
				<Link route="/raffles/new">
					<a className="item">+</a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};
