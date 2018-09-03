import React, { Component } from "react";
import {
  Card,
  Button,
  Segment,
  Divider,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";
import factory from "../ethereum/factory";
import Raffle from "../ethereum/raffle";
import Layout from "../components/Layout";
import RaffleItem from "../components/RaffleItem";
import RaffleNew from "./raffles/new";
import { Link } from "../routes";
class RaffleIndex extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.child.onSubmit();
  };
  static async getInitialProps(props) {
    const getRaffles = await factory.methods.getDeployedRaffles().call();
    return { getRaffles };
  }
  render() {
    let items = null;

    if (this.props.getRaffles) {
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
        <Modal
          trigger={
            <Button
              onClick={this.handleOpen}
              content="Create a new raffle"
              icon="add circle"
              color="green"
            />
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon
        >
          <Header
            icon="add circle"
            color="green"
            content="Create a new raffle"
          />
          <Modal.Content>
            <RaffleNew onRef={ref => (this.child = ref)} />
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Create my Raffle
            </Button>
          </Modal.Actions>
        </Modal>
        <div>
          <Segment loading={this.state.loading} vertical>
            {items}
          </Segment>
        </div>
      </Layout>
    );
  }
}

export default RaffleIndex;
