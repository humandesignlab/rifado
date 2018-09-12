import React, { Component } from "react";
import RaffleNew from "../pages/raffles/new";
import { Menu, Button, Modal, Icon, Header } from "semantic-ui-react";
import { Link } from "../routes";

class AppHeader extends Component {
  state = { modalOpen: false };
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.child.onSubmit();
  };

  render() {
    return (
      <Menu stackable>
        <Link route="/">
          <a className="item">Lottoether.com</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <Menu.Item content="Show all raffles" icon="eye" color="blue" />
          </Link>
          <Modal
            trigger={
              <Menu.Item
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
        </Menu.Menu>
      </Menu>
    );
  }
}
export default AppHeader;
