import React, { Component } from 'react';
import {
	Card,
	Label,
	Segment,
	Statistic,
	Responsive,
	Icon
} from 'semantic-ui-react';
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
		<h3>Open raffles</h3>;
		const items = this.state.raffles.map((raffle, index) => {
			return {
				key: index,
				header: (
					<Label size="large" attached="top">
						Raffle: {raffle.raffleAddress}
					</Label>
				),
				description: (
					<div>
						<p>This is the raffle description </p>
						<Responsive
							as={Segment.Group}
							{...Responsive.onlyComputer}
							horizontal
						>
							<Segment inverted color="teal" textAlign="center">
								<Statistic inverted size="tiny">
									<Statistic.Value>
										<Icon name="ethereum" /> {raffle.raffleBalance} ETH
									</Statistic.Value>
									<Statistic.Label>Accumulated Prize</Statistic.Label>
								</Statistic>
							</Segment>
							<Segment textAlign="center">
								<Statistic
									color={
										raffle.remainingNumberOfTickets === '0' ? 'grey' : 'green'
									}
									size="tiny"
								>
									<Statistic.Value>
										<Icon name="ticket" /> {raffle.remainingNumberOfTickets}
									</Statistic.Value>
									<Statistic.Label>Remaining tickets</Statistic.Label>
								</Statistic>
							</Segment>
							<Segment textAlign="center">
								<Statistic size="tiny">
									<Statistic.Value>
										<Icon color="green" name="check circle" /> 1 in{' '}
										{raffle.ticketsBlock}
									</Statistic.Value>
									<Statistic.Label>Chances per Ticket</Statistic.Label>
								</Statistic>
							</Segment>
							<Segment textAlign="center">
								<Statistic size="tiny">
									<Statistic.Value>
										<Icon color="green" name="calendar" /> 12/12/18
									</Statistic.Value>
									<Statistic.Label>Draw date</Statistic.Label>
								</Statistic>
							</Segment>
						</Responsive>
						<Link route={`/raffles/${raffle.raffleAddress}`}>
							<a>View raffle details</a>
						</Link>
					</div>
				),
				fluid: true
			};
		});
		console.log('items ', items);
		return (
			<div>
				<h3>Open raffles</h3>{' '}
				<Card.Group stackable={true} keys={items.id} items={items} />
			</div>
		);
	}
}

export default RafflesList;
