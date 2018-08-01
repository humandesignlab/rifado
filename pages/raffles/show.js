import React, { Component } from 'react';
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
						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon name="ethereum" />
									{this.props.raffleBalance} ETH
								</Statistic.Value>
								<Statistic.Label>Balance</Statistic.Label>
							</Statistic>
						</Segment>
						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon name="users" />
									{this.props.raffleSoldTickets}
								</Statistic.Value>
								<Statistic.Label>Players</Statistic.Label>
							</Statistic>
						</Segment>
						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon name="ticket" />
									{this.props.raffleRemainingTickets}
								</Statistic.Value>
								<Statistic.Label>Remaining tickets</Statistic.Label>
							</Statistic>
						</Segment>
						<Segment textAlign="center">
							<Statistic size="tiny">
								<Statistic.Value>
									<Icon name="calendar" />
									12/12/18
								</Statistic.Value>
								<Statistic.Label>Draw date</Statistic.Label>
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
							<Grid.Column width={10}>
								<Segment.Group horizontal>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon name="ethereum" />
												{this.props.raffleBalance} ETH
											</Statistic.Value>
											<Statistic.Label>Balance</Statistic.Label>
										</Statistic>
									</Segment>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon name="users" />
												{this.props.raffleSoldTickets}
											</Statistic.Value>
											<Statistic.Label>Players</Statistic.Label>
										</Statistic>
									</Segment>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon name="ticket" />
												{this.props.raffleRemainingTickets}
											</Statistic.Value>
											<Statistic.Label>Remaining tickets</Statistic.Label>
										</Statistic>
									</Segment>
									<Segment textAlign="center">
										<Statistic size="tiny">
											<Statistic.Value>
												<Icon name="calendar" />
												12/12/18
											</Statistic.Value>
											<Statistic.Label>Draw date</Statistic.Label>
										</Statistic>
									</Segment>
								</Segment.Group>
							</Grid.Column>
							<Grid.Column width={6}>{this.renderTicketNumbers()}</Grid.Column>
						</Grid.Row>
					</Grid>
					<p>Created by: {this.props.raffleManager}</p>
				</Responsive>
			</Layout>
		);
	}
}

export default RaffleShow;
