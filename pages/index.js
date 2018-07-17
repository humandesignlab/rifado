import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class RaffleIndex extends Component {
	static async getInitialProps() {
		const raffles = await factory.methods.getDeployedRaffles().call();
		return { raffles: raffles };
	}

	renderRaffles() {
		const items = this.props.raffles.map(address => {
			return {
				header: address,
				description: (
					<Link route={`/raffles/${address}`}>
						<a>View raffle</a>
					</Link>
				),
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<div>
					<h3>Open raffles</h3>
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

					{this.renderRaffles()}
				</div>
			</Layout>
		);
	}
}

export default RaffleIndex;
