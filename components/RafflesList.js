import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
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
				soldTicketsNumbers: res[5],
				drawDate: parseInt(res[6]) * 1000
			};
			await this.state.raffles.push(raffleObj);
		});
	}

	render() {
		<h3>Open raffles</h3>;
		const Completionist = () => <span> Raffle has ended</span>;
		const renderer = ({ days, hours, minutes, seconds, completed }) => {
			if (completed) {
				// Render a completed state
				return <Completionist />;
			} else {
				// Render a countdown
				return (
					<span>
						{days}:{hours}:{minutes}:{seconds}
					</span>
				);
			}
		};
		const items = this.state.raffles.map((raffle, index) => {
			return {
				key: index,
				header: (
					<div>
						<Responsive
							as={Label}
							size="large"
							attached="top"
							textalign="left"
							{...Responsive.onlyComputer}
						>
							Raffle: {raffle.raffleAddress}
						</Responsive>
						<Responsive
							minWidth={320}
							maxWidth={991}
							as={Label}
							size="small"
							attached="top"
							textAlign="left"
						>
							Raffle: {raffle.raffleAddress}
						</Responsive>
						<p>This is the raffle description </p>
					</div>
				),
				description: (
					<div>
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
										<Icon color="green" name="calendar" />
										<Countdown
											date={raffle.drawDate}
											renderer={renderer}
											// daysInHours={false}
										/>
									</Statistic.Value>
									<Statistic.Label>Time Left to Draw</Statistic.Label>
								</Statistic>
							</Segment>
						</Responsive>

						<Responsive as={Segment.Group} minWidth={320} maxWidth={991}>
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
										<Icon color="green" name="calendar" />
										<Countdown
											date={raffle.drawDate}
											renderer={renderer}
											// daysInHours={false}
										/>
									</Statistic.Value>
									<Statistic.Label>Time Left to Draw</Statistic.Label>
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
