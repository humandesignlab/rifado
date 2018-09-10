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
  state = { modalOpen: false, rafflesArr: [] };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.child.onSubmit();
  };
  static async getInitialProps(props) {
    const rafflesArr = [];
    const getRaffles = await factory.methods.getDeployedRaffles().call();
    const raffleItems = await Promise.all(
      getRaffles.map(item => {
        const raffle = Raffle(item);
        const summarys = raffle.methods.getRaffleSummary().call();
        return summarys;
      })
    );
    return { getRaffles, raffleItems };
  }
  render() {
    console.log("this.props.raffleItems ", this.props.raffleItems);
    let items = null;

    if (this.state.rafflesArr) {
      items = (
        <div>
          {this.props.raffleItems.map((item, index) => {
            return (
              <div key={index}>
                <RaffleItem
                  key={index}
                  rafflename={item[0]}
                  balance={item[1]}
                  soldTickets={item[2]}
                  remainingTickets={item[3]}
                  blockLength={item[4]}
                  soldNumbers={item[5]}
                  drawDate={item[6]}
                  creator={item[7]}
                />{" "}
                <Divider hidden />
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
        <Segment loading={this.state.loading} vertical>
          {items}
        </Segment>
      </Layout>
    );
  }
}

export default RaffleIndex;
