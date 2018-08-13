import React, { Component } from 'react';
import { Card, Button, Segment } from 'semantic-ui-react';
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
					<Segment vertical>
						<RafflesList />
					</Segment>
				</div>
			</Layout>
		);
	}
}

export default RaffleIndex;
