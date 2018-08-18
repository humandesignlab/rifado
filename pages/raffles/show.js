import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import RaffleItem from '../../components/RaffleItem';

class RaffleShow extends Component {
	render() {
		console.log('this.props ', this.props);
		return (
			<Layout>
				<div>
					<Segment vertical>
						<RaffleItem rafflename={this.props.url.query.address} />
					</Segment>
				</div>
			</Layout>
		);
	}
}

export default RaffleShow;
