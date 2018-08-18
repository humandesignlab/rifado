import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import {
	Grid,
	Icon,
	List,
	Statistic,
	Card,
	Segment,
	Button,
	Label,
	Divider,
	Form,
	Message,
	Responsive,
	Header
} from 'semantic-ui-react';
import Layout from './Layout';
import Raffle from '../ethereum/raffle';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RaffleItem extends Component {
	state = {
		ticketBlockSize: '',
		errorMessage: '',
		loading: false,
		value: '',
		loadingMessage: '',
		hideStandByMessage: true
	};
	async componentWillMount(props) {
		const address = this.props.rafflename;
		const raffle = Raffle(address);
		const summary = await raffle.methods.getRaffleSummary().call();
		const manager = await raffle.methods.manager().call();
		console.log(summary);
		this.setState({
			raffleAddress: address,
			raffleBalance: web3.utils.fromWei(summary[1], 'ether'),
			raffleSoldTickets: summary[2],
			raffleRemainingTickets: summary[3],
			raffleTicketsBlockLength: summary[4],
			raffleSoldTicketsNumbers: summary[5],
			raffleDrawDate: parseInt(summary[6]) * 1000,
			raffleManager: manager
		});
	}

	onSubmit = async event => {
		event.preventDefault();
		const raffle = Raffle(this.state.raffleAddress);
		this.setState({
			loading: true,
			errorMessage: '',
			hideStandByMessage: false,
			loadingMessage: 'Please stand by for the Blockchain to update.'
		});

		try {
			const accounts = await web3.eth.getAccounts();
			await raffle.methods.buyTicket(this.state.value).send({
				from: accounts[0],
				value: web3.utils.toWei('0.011', 'ether')
			});
			Router.replaceRoute(`/raffles/${this.state.raffleAddress}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({
			loading: false,
			value: '',
			loadingMessage: '',
			hideStandByMessage: true
		});
	};

	renderTicketNumbers() {
		const ticketsArray = [];
		for (let i = 1; i <= this.state.raffleTicketsBlockLength; i++) {
			ticketsArray.push(i.toString());
		}

		const reminingTicketsArray = ticketsArray.filter(
			f => !this.state.raffleSoldTicketsNumbers.includes(f)
		);

		const items = reminingTicketsArray.map((item, index) => {
			return <option key={index}>{item}</option>;
		});

		return (
			<Segment vertical>
				<Divider fitted hidden />
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Group>
						<Form.Field
							value={this.state.value}
							onChange={event => this.setState({ value: event.target.value })}
							control="select"
						>
							<option disabled label="Select a ticket number:" />;
							{items}
						</Form.Field>
					</Form.Group>
					<Button disabled={this.state.loading} as="div" labelPosition="right">
						<Button color="teal" icon loading={this.state.loading}>
							<Icon size="small" name="ticket" /> Buy Ticket
						</Button>
						<Label as="a" basic pointing="left">
							0.011 ETH
						</Label>
					</Button>
					<Message
						error
						header="Something went wrong!"
						content={this.state.errorMessage}
					/>
					<Message
						color="yellow"
						hidden={this.state.hideStandByMessage}
						header="Transaction is being processed on Ethereum Blockchain."
						content={this.state.loadingMessage}
					/>
				</Form>
			</Segment>
		);
	}

	render() {
		const Completionist = () => (
			<span>
				<Icon size="small" color="red" name="calendar" /> Raffle has ended
			</span>
		);
		const renderer = ({ days, hours, minutes, seconds, completed }) => {
			if (completed) {
				// Render a completed state
				return <Completionist />;
			} else {
				// Render a countdown
				return (
					<span>
						<Icon size="small" color="green" name="calendar" /> {days}:{hours}:{
							minutes
						}:{seconds}
						<Statistic.Label>Time Left to Draw</Statistic.Label>
					</span>
				);
			}
		};
		return (
			<div>
				<Responsive as={Segment} minWidth={320} maxWidth={991}>
					<Label basic color="teal" attached="top left">
						Raffle hash: {this.state.raffleAddress}
					</Label>
					{this.renderTicketNumbers()}
					<Segment.Group>
						<Segment inverted color="teal" textAlign="center">
							<Statistic inverted size="tiny">
								<Statistic.Value>
									<Icon size="small" name="ethereum" />{' '}
									{this.state.raffleBalance} ETH
								</Statistic.Value>
								<Statistic.Label>Accumulated Prize</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic
								color={
									this.state.raffleRemainingTickets === '0' ? 'grey' : 'green'
								}
								size="tiny"
							>
								<Statistic.Value>
									<Icon size="small" name="ticket" />{' '}
									{this.state.raffleRemainingTickets}
								</Statistic.Value>
								<Statistic.Label>Remaining tickets</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon size="small" color="green" name="check circle" /> 1 in{' '}
									{this.state.raffleTicketsBlockLength}
								</Statistic.Value>
								<Statistic.Label>Chances per Ticket</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Countdown
										date={this.state.raffleDrawDate}
										renderer={renderer}
										// daysInHours={false}
									/>
								</Statistic.Value>
							</Statistic>
						</Segment>
					</Segment.Group>
					<p>Created by: {this.state.raffleManager}</p>
				</Responsive>

				<Responsive as={Segment} {...Responsive.onlyComputer} secondary>
					<Label ribbon size="big" basic color="teal">
						Raffle hash: {this.state.raffleAddress}
					</Label>
					<Divider hidden />

					<Grid divided="vertically">
						<Grid.Row columns={2}>
							<Grid.Column width={4}>{this.renderTicketNumbers()}</Grid.Column>
							<Grid.Column width={12}>
								<Segment.Group horizontal>
									<Segment inverted color="teal" textAlign="center">
										<Statistic inverted size="tiny">
											<Statistic.Value>
												<Icon size="small" name="ethereum" />{' '}
												{this.state.raffleBalance} ETH
											</Statistic.Value>
											<Statistic.Label>Accumulated Prize</Statistic.Label>
										</Statistic>
									</Segment>

									<Segment textAlign="center">
										<Statistic
											color={
												this.state.raffleRemainingTickets === '0'
													? 'grey'
													: 'green'
											}
											size="tiny"
										>
											<Statistic.Value>
												<Icon size="small" name="ticket" />{' '}
												{this.state.raffleRemainingTickets}
											</Statistic.Value>
											<Statistic.Label>Remaining tickets</Statistic.Label>
										</Statistic>
									</Segment>

									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon size="small" color="green" name="check circle" />{' '}
												1 in {this.state.raffleTicketsBlockLength}
											</Statistic.Value>
											<Statistic.Label>Chances per Ticket</Statistic.Label>
										</Statistic>
									</Segment>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Countdown
													date={this.state.raffleDrawDate}
													renderer={renderer}
													// daysInHours={false}
												/>
											</Statistic.Value>
										</Statistic>
									</Segment>
								</Segment.Group>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<p>Created by: {this.state.raffleManager}</p>
				</Responsive>
			</div>
		);
	}
}

export default RaffleItem;