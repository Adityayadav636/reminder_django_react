 
// export default HomeScreen;
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

import React from 'react';
import { Button, Typography, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
  },
  paper: {
      padding: theme.spacing(2),
  },
  button: {
      margin: theme.spacing(1),
  },
}));
function HomeScreen() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentDate = new Date();
    
    // Array of day names
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Array of month names
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[currentDate.getDay()];
    const monthName = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();

    const ordinalSuffix = (dayOfMonth) => {
        if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
            return 'st';
        } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
            return 'nd';
        } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
            return 'rd';
        }
        return 'th';
    };
    const userDetails = useSelector((state) => state.user.userDetails);

  const handleLogout = () => {
    dispatch(logout());
    console.log("hi")
    history.push("/");

    window.location.reload(); // Reload the page

  };
    return (
        <Container className={classes.container} maxWidth="md">
          <div style={ {display : "flex"}}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Reminder Application.
            </Typography>
            
            <Button variant="contained" color="secondary" onClick={handleLogout}  className={classes.button}>Log Out</Button>
            </div>
            <Typography variant="h6" color="textSecondary" gutterBottom>
            {`Today is ${dayName}, ${dayOfMonth}${ordinalSuffix(dayOfMonth)} of ${monthName}.`}
        </Typography>

            <Paper className={classes.paper}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/setreminder">Set Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/modifyreminder">Modify Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/disablereminder">Disable Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/deletereminder">Delete Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/enablereminder">Enable Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/viewreminder">View your Reminders</Button>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default HomeScreen;
