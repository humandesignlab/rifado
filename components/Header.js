import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">Lottoether.com</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a>
            <Button content="See all raffles" icon="eye" color="blue" />
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
