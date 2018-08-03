import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Raffle from '../ethereum/raffle';
import Layout from '../components/Layout';
import RafflesList from '../components/RafflesList';
import { Link } from '../routes';
class RaffleIndex extends Component {
	render() {
		return (
			<Layout>
				<div>
					<h3>Open raffles</h3>
					<Link route="/">
						<a>
							<Button content="See all raffles" icon="eye" primary={true} />
						</a>
					</Link>
					<Link route="/raffles/new">
						<a>
							<Button
								floated="right"
								content="Create a new raffle"
								icon="add circle"
								primary={true}
							/>
						</a>
					</Link>

					<RafflesList />
				</div>
			</Layout>
		);
	}
}

export default RaffleIndex;
