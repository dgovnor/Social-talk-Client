import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AppRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});
AppRoute.propTypes = {
  user: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(AppRoute);
