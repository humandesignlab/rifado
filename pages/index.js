import React, { Component } from 'react';
import { Card, Button, Segment, Divider } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Raffle from '../ethereum/raffle';
import Layout from '../components/Layout';
import RaffleItem from '../components/RaffleItem';
import { Link } from '../routes';
class RaffleIndex extends Component {
	static async getInitialProps(props) {
		const getRaffles = await factory.methods.getDeployedRaffles().call();
		return { getRaffles };
	}
	render() {
		let items = null;

		if (this.props.getRaffles) {
			console.log('this.props.getRaffles ', this.props.getRaffles);
			items = (
				<div>
					{this.props.getRaffles.map((item, index) => {
						return (
							<div key={index}>
								<RaffleItem key={index} rafflename={item} /> <Divider hidden />
							</div>
						);
					})}
				</div>
			);
		}

		return (
			<Layout>
				<div>
					<Segment key={items} vertical>
						{items}
					</Segment>
				</div>
			</Layout>
		);
	}
}

export default RaffleIndex;
