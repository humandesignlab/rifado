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
  { key: 1, text: "Draw Date (sooner first)", value: 1 },
  { key: 2, text: "Prize amount (more first)", value: 2 },
  { key: 3, text: "Sold tickets (more first)", value: 3 }
];
class RaffleIndex extends Component {
  state = { value: null };

  handleChange = (e, { value }) => this.setState({ value });

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
                return a[6] - b[6];
              } else if (this.state.value === 2) {
                return b[1] - a[1];
              } else if (this.state.value === 3) {
                return b[2] - a[2];
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
