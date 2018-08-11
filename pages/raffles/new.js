import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class RaffleNew extends Component {
	state = {
		ticketBlockSize: '',
		setDrawDate: '',
		errorMessage: '',
		loading: false
	};
	onSubmit = async event => {
		event.preventDefault();

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
			<Layout>
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
						<label>
							Enter the number of seconds you want to set for your raffle to
							draw.
						</label>
						<Input
							label="Draw Date in seconds"
							labelPosition="right"
							value={this.state.setDrawDate}
							onChange={event =>
								this.setState({ setDrawDate: event.target.value })
							}
						/>
					</Form.Field>
					<Message
						error
						header="Something went wrong!"
						content={this.state.errorMessage}
					/>
					<Button loading={this.state.loading} primary>
						Create raffle
					</Button>
				</Form>
			</Layout>
		);
	}
}

export default RaffleNew;
