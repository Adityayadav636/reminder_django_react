import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listReminders } from '../redux/slices/reminderSlice'; // Adjust the import path
import {
    Button, Typography, Container, Grid, Paper, TextField, FormControl,
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
    },
    
    formControl: {
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function ViewRemindersScreen() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const reminders = useSelector(state => state.reminder.listReminders);
    const loading = useSelector(state => state.reminder.loading);
    const error = useSelector(state => state.reminder.error);
    const history = useHistory();

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedReminders, setSelectedReminders] = useState([]);

    useEffect(() => {
        dispatch(listReminders());
    }, [dispatch]);

    const filteredReminders = reminders.filter(reminder => {
        const isAfterFromDate = fromDate ? new Date(reminder.date) >= new Date(fromDate) : true;
        const isBeforeToDate = toDate ? new Date(reminder.date) <= new Date(toDate) : true;
        const isOfSubject = subject ? reminder.subject === subject : true;

        return isAfterFromDate && isBeforeToDate && isOfSubject;
    });
   
  const handleLogout = () => {
    dispatch(logout());
    console.log("hi")
    history.push("/");

    window.location.reload(); // Reload the page

  };
    console.log(filteredReminders)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                View Your Reminders
            </Typography>
            <Paper className={classes.paper}>
                <Grid container style={{ margin: "20px"}} spacing={3}>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="from-date"
                            label="Select From Date"
                            type="date"
                            InputProps={{
                                startAdornment: <CalendarTodayIcon />,
                            }}
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="to-date"
                            label="Select To Date"
                            type="date"
                            InputProps={{
                                startAdornment: <CalendarTodayIcon />,
                            }}
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="subject-label">Subject</InputLabel>
                            <Select
                                labelId="subject-label"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            >
                                <MenuItem value={"English"}>English</MenuItem>
                                <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {filteredReminders.map(reminder => (
    <React.Fragment key={reminder.id}>
        <Grid item xs={2}>
            {reminder.date}
        </Grid>
        <Grid item xs={2}>
            {reminder.subject}
        </Grid>
        <Grid item xs={2}>
            {reminder.recurrence}
        </Grid>
        <Grid item xs={2}>
            {reminder.email}
        </Grid>
        <Grid item xs={2}>
            {reminder.contact_no}
        </Grid>
        <Grid item xs={2}>
            {reminder.sms_no}
        </Grid>
       
    </React.Fragment>
))}

                </Grid>
                <Button variant="contained" color="secondary" onClick={handleLogout}   className={classes.button}>
                    Log Out
                </Button>
            </Paper>
        </Container>
    );
}

export default ViewRemindersScreen;
