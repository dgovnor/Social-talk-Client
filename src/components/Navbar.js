import React, { Component } from "react";

//MUI component
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import link from "react-router-dom/Link";
class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={link} to="/">
            Home
          </Button>
          <Button color="inherit" component={link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
