import React, { Component } from 'react';
import { Button, Form, Input, Message, Container } from 'semantic-ui-react';
import {
	DateInput,
	TimeInput,
	DateTimeInput,
	DatesRangeInput
} from 'semantic-ui-calendar-react';
import moment from 'moment';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class RaffleNew extends Component {
	state = {
		ticketBlockSize: '',
		setDrawDate: '',
		errorMessage: '',
		loading: false,
		date: '',
		time: '',
		dateTime: '',
		datesRange: ''
	};

	componentDidMount = () => {
		this.props.onRef(this);
	};
	componentWillUnmount = () => {
		this.props.onRef(undefined);
	};

	handleDateChange = (event, { name, value }) => {
		if (this.state.hasOwnProperty(name)) {
			this.setState({ [name]: value });
		}
		this.state.setDrawDate = moment(this.state.date).diff(
			moment().startOf('day'),
			'seconds'
		);
		console.log(this.state.setDrawDate);
	};

	onSubmit = async event => {
		// event.preventDefault();
		this.setState({ loading: true, errorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createRaffle(this.state.ticketBlockSize, this.state.setDrawDate)
				.send({ from: accounts[0] });
			Router.pushRoute('/');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Container>
				<h3>How many tickets will your raffle have?</h3>
				<p>
					The less tickets your ticket block has, each player has more chances
					to win. The more tickets you create, the bigger the money a player can
					win, but since the chances are smaller, the raffle could take more
					time to finish. Unless you do an awesome job selling all the tickets
					quickly!
				</p>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>
							Enter the number of tickets you want to sell for your raffle. (Up
							to 999)
						</label>
						<Input
							label="Tickets"
							labelPosition="right"
							value={this.state.ticketBlockSize}
							onChange={event =>
								this.setState({ ticketBlockSize: event.target.value })
							}
						/>
					</Form.Field>
					<DateInput
						name="date"
						placeholder="Set Draw Date"
						startMode="day"
						initialDate={moment()}
						dateFormat="YYYY-MM-DD"
						minDate={moment()}
						value={this.state.date}
						iconPosition="left"
						onChange={this.handleDateChange}
						closable={true}
						maxDate={moment().add(1, 'M')}
					/>

					<Message
						error
						header="Something went wrong!"
						content={this.state.errorMessage}
					/>
					<Button loading={this.state.loading} primary>
						Create raffle
					</Button>
				</Form>
			</Container>
		);
	}
}

export default RaffleNew;
