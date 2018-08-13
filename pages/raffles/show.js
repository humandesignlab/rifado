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
	Responsive
} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Raffle from '../../ethereum/raffle';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class RaffleShow extends Component {
	state = {
		ticketBlockSize: '',
		errorMessage: '',
		loading: false,
		value: '',
		loadingMessage: '',
		hideStandByMessage: true
	};
	static async getInitialProps(props) {
		const raffle = Raffle(props.query.address);
		const summary = await raffle.methods.getRaffleSummary().call();
		const manager = await raffle.methods.manager().call();
		console.log(summary);
		return {
			raffleAddress: props.query.address,
			raffleBalance: web3.utils.fromWei(summary[1], 'ether'),
			raffleSoldTickets: summary[2],
			raffleRemainingTickets: summary[3],
			raffleTicketsBlockLength: summary[4],
			raffleSoldTicketsNumbers: summary[5],
			raffleDrawDate: parseInt(summary[6]) * 1000,
			raffleManager: manager
		};
	}

	onSubmit = async event => {
		event.preventDefault();
		const raffle = Raffle(this.props.raffleAddress);
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
			Router.replaceRoute(`/raffles/${this.props.raffleAddress}`);
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
		for (let i = 1; i <= this.props.raffleTicketsBlockLength; i++) {
			ticketsArray.push(i.toString());
		}

		const reminingTicketsArray = ticketsArray.filter(
			f => !this.props.raffleSoldTicketsNumbers.includes(f)
		);

		const items = reminingTicketsArray.map((item, index) => {
			return <option key={index}>{item}</option>;
		});

		return (
			<Segment>
				<Label attached="top">Buy a Ticket for this Raffle</Label>
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
						<Button icon loading={this.state.loading}>
							<Icon name="ticket" />
							Buy Ticket
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
		const Completionist = () => <span>Raffle has ended</span>;
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
		return (
			<Layout>
				<Responsive as={Segment} minWidth={320} maxWidth={991}>
					<Card fluid>
						<Card.Content>
							<Card.Header>Raffle details:</Card.Header>
							<Card.Meta>{this.props.raffleAddress}</Card.Meta>
						</Card.Content>
					</Card>
					{this.renderTicketNumbers()}
					<Segment.Group>
						<Segment inverted color="teal" textAlign="center">
							<Statistic inverted size="tiny">
								<Statistic.Value>
									<Icon name="ethereum" /> {this.props.raffleBalance} ETH
								</Statistic.Value>
								<Statistic.Label>Accumulated Prize</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic
								color={
									this.props.remainingNumberOfTickets === '0' ? 'grey' : 'green'
								}
								size="tiny"
							>
								<Statistic.Value>
									<Icon name="ticket" /> {this.props.raffleRemainingTickets}
								</Statistic.Value>
								<Statistic.Label>Remaining tickets</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon color="green" name="check circle" /> 1 in{' '}
									{this.props.raffleTicketsBlockLength}
								</Statistic.Value>
								<Statistic.Label>Chances per Ticket</Statistic.Label>
							</Statistic>
						</Segment>

						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon color="green" name="calendar" />
									<Countdown
										date={this.props.raffleDrawDate}
										renderer={renderer}
										// daysInHours={false}
									/>
								</Statistic.Value>
								<Statistic.Label>Time Left to Draw</Statistic.Label>
							</Statistic>
						</Segment>
					</Segment.Group>
					<p>Created by: {this.props.raffleManager}</p>
				</Responsive>

				<Responsive as={Segment} {...Responsive.onlyComputer}>
					<Card fluid>
						<Card.Content>
							<Card.Header>Raffle details:</Card.Header>
							<Card.Meta>{this.props.raffleAddress}</Card.Meta>
						</Card.Content>
					</Card>
					<Grid divided="vertically">
						<Grid.Row columns={2} divided>
							<Grid.Column width={4}>{this.renderTicketNumbers()}</Grid.Column>
							<Grid.Column width={12}>
								<Segment.Group horizontal>
									<Segment inverted color="teal" textAlign="center">
										<Statistic inverted size="tiny">
											<Statistic.Value>
												<Icon name="ethereum" /> {this.props.raffleBalance} ETH
											</Statistic.Value>
											<Statistic.Label>Accumulated Prize</Statistic.Label>
										</Statistic>
									</Segment>

									<Segment textAlign="center">
										<Statistic
											color={
												this.props.remainingNumberOfTickets === '0'
													? 'grey'
													: 'green'
											}
											size="tiny"
										>
											<Statistic.Value>
												<Icon name="ticket" />{' '}
												{this.props.raffleRemainingTickets}
											</Statistic.Value>
											<Statistic.Label>Remaining tickets</Statistic.Label>
										</Statistic>
									</Segment>

									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon color="green" name="check circle" /> 1 in{' '}
												{this.props.raffleTicketsBlockLength}
											</Statistic.Value>
											<Statistic.Label>Chances per Ticket</Statistic.Label>
										</Statistic>
									</Segment>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon color="green" name="calendar" />
												<Countdown
													date={this.props.raffleDrawDate}
													renderer={renderer}
													// daysInHours={false}
												/>
											</Statistic.Value>
											<Statistic.Label>Time Left to Draw</Statistic.Label>
										</Statistic>
									</Segment>
								</Segment.Group>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<p>Created by: {this.props.raffleManager}</p>
				</Responsive>
			</Layout>
		);
	}
}

export default RaffleShow;
