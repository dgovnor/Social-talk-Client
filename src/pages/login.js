import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import image from "../images/logo.ico";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    width: "50px",
    height: "auto"
  },
  pageTitle: {
    margin: "10px auto 20px auto"
  },
  button: {
    margin: "20px 10px",
    position: "relative"
  },
  progress: {
    position: "absolute"
  },
  textField: {
    margin: "10px auto 20px auto"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem"
  }
};

class login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) this.setState({ errors: nextProps.ui.errors });
  }
  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      ui: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={image} alt="logo" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              values={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              values={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  color="primary"
                  size={30}
                  className={classes.progress}
                />
              )}
              Login
            </Button>
            <br />
            <small>
              Don't have an account Sign up <Link to="/signup">HERE</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});
const mapActionToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
