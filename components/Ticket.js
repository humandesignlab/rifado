import React, { Component } from "react";
import { Segment, Label, Icon, Divider } from "semantic-ui-react";
import Raffle from "../ethereum/raffle";
import web3 from "../ethereum/web3";
import moment from "moment";

class Ticket extends Component {
  state = {
    activeAccount: 0,
    ticketOwnerStructs: [],
    userTickets: []
  };

  async componentDidMount(props) {
    web3.eth.getAccounts((error, accounts) =>
      this.setState({ activeAccount: accounts[0] })
    );
    const raffleAddress = this.props.ticketrafflename;
    const ticketBlockSize = this.props.ticketownerlist - 1;

    console.log("ticketBlockSize ", ticketBlockSize);

    const raffle = Raffle(raffleAddress);
    const ownerArr = [];

    for (let i = 0; i <= ticketBlockSize; i++) {
      ownerArr.push(i.toString());
    }

    const getRafflesImIn = await raffle.methods
      .getTicketOwnersList(ownerArr)
      .call();
    console.log(ownerArr);
    const ticketOwnerLength = getRafflesImIn[0].length;
    const FIELD_TICKET_BUYER = 0;
    const FIELD_PICKED_NUMBER = 1;
    const FIELD_TIME_STAMP = 2;

    for (let i = 0; i < ticketOwnerLength; i++) {
      const ticket = {
        raffleAddress: raffleAddress,
        owner: getRafflesImIn[FIELD_TICKET_BUYER][i],
        pickedNumber: getRafflesImIn[FIELD_PICKED_NUMBER][i],
        timeStamp: parseInt(getRafflesImIn[FIELD_TIME_STAMP][i]) * 1000
      };
      this.state.ticketOwnerStructs.push(ticket);
    }

    const result = this.state.ticketOwnerStructs.filter(obj => {
      return obj.owner === this.state.activeAccount;
    });
    this.setState({ userTickets: result });
  }

  render() {
    const ticketStyle = {
      width: "120px",
      height: "80px",
      display: "block",
      backgroundColor: "rgb(0, 181, 173)",
      color: "#fff",
      padding: "10px",
      textAlign: "center",
      margin: "10px",
      borderRadius: "4px"
    };

    const ticketLeftPunch = {
      left: "-20px",
      backgroundColor: "#fff",
      width: "20px",
      height: "20px",
      borderRadius: "10px",
      position: "relative",
      top: "-40px"
    };

    const ticketRightPunch = {
      left: "100px",
      backgroundColor: "#fff",
      width: "20px",
      height: "20px",
      borderRadius: "10px",
      position: "relative",
      top: "-60px"
    };
    const renderUserTickets = this.state.userTickets.map((item, index) => {
      return (
        <div key={index} style={ticketStyle}>
          <div>
            <Icon size="large" name="ticket" />
            <div>{String(item.pickedNumber / 1000).slice(2)}</div>
            <div>{moment(item.timeStamp).format("YYYY-MM-DD")}</div>
          </div>
          <div style={ticketLeftPunch} />
          <div style={ticketRightPunch} />
        </div>
      );
    });
    return <Segment.Group horizontal> {renderUserTickets} </Segment.Group>;
  }
}
export default Ticket;
