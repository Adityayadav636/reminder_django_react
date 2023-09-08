import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginScreen({ location, history }) {
  const classes = useStyles();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // Get redirect URL from query parameter in the URL
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Get user login state from Redux store
  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  // Redirect to the specified page if the user is already logged in
  useEffect(() => {
    if (userDetails) {
      history.replace( "/home"
      );
    }
  }, [history, userDetails ]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Typography component="h1" style={{ fontWeight: "bold" }} variant="h5">
        Sign In
      </Typography>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit} 
        >
          Sign In
        </Button>
        <Grid container justify="flex-start">
          <Grid item>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              variant="body2"
            >
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
}

export default LoginScreen;
