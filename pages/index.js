import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Raffle from '../ethereum/raffle';
import Layout from '../components/Layout';
import { Link } from '../routes';
class RaffleIndex extends Component {
	state = { raffles: [] };
	async componentWillMount() {
		const getRaffles = await factory.methods.getDeployedRaffles().call();
		const raffles = getRaffles.map(async address => {
			const raffle = Raffle(address);
			const res = await raffle.methods.getRaffleSummary().call();
			// console.log(res);
			const raffleObj = await {
				raffleAddress: res[0],
				raffleBalance: res[1],
				soldTickets: res[2],
				remainingNumberOfTickets: res[3],
				ticketsBlock: res[4],
				soldTicketsNumbers: res[5]
			};
			await this.state.raffles.push(raffleObj);
		});
	}

	// static async getInitialProps() {
	// 	return { raffles: rafflesArr };
	// }

	renderRaffles() {
		console.log('this.state ', this.state);
		const items = this.state.raffles.map((raffle, index) => {
			return {
				header: raffle.raffleAddress,
				description: (
					<div>
						<ul>
							<li>Balance: {raffle.raffleBalance} ETH</li>
							<li>
								Remaining Number of Tickets: {raffle.remainingNumberOfTickets}
							</li>
						</ul>
						<Link route={`/raffles/${raffle.raffleAddress}`}>
							<a>View raffle</a>
						</Link>
					</div>
				),
				fluid: true
			};
		});

		return <Card.Group keys={items.id} items={items} />;
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
