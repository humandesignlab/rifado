import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Raffle from '../ethereum/raffle';
import web3 from '../ethereum/web3';
import { Link } from '../routes';
class RafflesList extends Component {
	state = { raffles: [] };
	async componentWillMount() {
		const getRaffles = await factory.methods.getDeployedRaffles().call();
		const raffles = getRaffles.map(async address => {
			const raffle = Raffle(address);
			const res = await raffle.methods.getRaffleSummary().call();
			// console.log(res);
			const raffleObj = await {
				raffleAddress: res[0],
				raffleBalance: web3.utils.fromWei(res[1], 'ether'),
				soldTickets: res[2],
				remainingNumberOfTickets: res[3],
				ticketsBlock: res[4],
				soldTicketsNumbers: res[5]
			};
			await this.state.raffles.push(raffleObj);
		});
	}

	render() {
		const items = this.state.raffles.map((raffle, index) => {
			return {
				header: raffle.raffleAddress,
				description: (
					<div>
						<ul>
							<li>Accumulated Prize: {raffle.raffleBalance} ETH</li>
							<li>
								Remaining Number of Tickets: {raffle.remainingNumberOfTickets}
							</li>
							<li>Chances of Winning: 1 in {raffle.ticketsBlock}</li>
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
}

export default RafflesList;
