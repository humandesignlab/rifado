import React, { Component } from "react";
import {
  Card,
  Button,
  Segment,
  Divider,
  Modal,
  Header,
  Icon,
  Dropdown
} from "semantic-ui-react";
import factory from "../ethereum/factory";
import Raffle from "../ethereum/raffle";
import Layout from "../components/Layout";
import RaffleItem from "../components/RaffleItem";
import RaffleNew from "./raffles/new";
import { Link } from "../routes";

const options = [
  { key: 1, text: "Date (recent first)", value: 1 },
  { key: 2, text: "Date (older first)", value: 2 },
  { key: 3, text: "Prize amount (more first)", value: 3 },
  { key: 4, text: "Prize amount (less first)", value: 4 },
  { key: 5, text: "Sold tickets (more first)", value: 5 },
  { key: 6, text: "Sold tickets (less first)", value: 6 }
];
class RaffleIndex extends Component {
  state = { modalOpen: false };

  handleChange = (e, { value }) => this.setState({ value });

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.child.onSubmit();
  };
  static async getInitialProps(props) {
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
    const { value } = this.state;
    console.log("this.props.raffleItems ", this.props.raffleItems);
    console.log("this.state ", this.state);
    let items = null;

    if (this.props.raffleItems) {
      items = (
        <div>
          {this.props.raffleItems
            .sort((a, b) => {
              if (this.state.value === 1) {
                return a[6] > b[6];
              } else if (this.state.value === 2) {
                return a[6] < b[6];
              } else if (this.state.value === 3) {
                return a[1] < b[1];
              } else if (this.state.value === 4) {
                return a[1] > b[1];
              } else if (this.state.value === 5) {
                return a[2] < b[2];
              } else if (this.state.value === 6) {
                return a[2] > b[2];
              }
            })
            .map((item, index) => {
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
        <Dropdown
          onChange={this.handleChange}
          options={options}
          placeholder="Sort by:"
          selection
          value={value}
        />
        <Segment loading={this.state.loading} vertical>
          {items}
        </Segment>
      </Layout>
    );
  }
}

export default RaffleIndex;
