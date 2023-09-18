import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { listReminders } from '../redux/slices/reminderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
    formControl: {
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function DisableReminderScreen() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [selectedReminderId, setSelectedReminderId] = useState(null);
    const history = useHistory();

    const dispatch = useDispatch();
    const reminders = useSelector(state => state.reminder.listReminders);

    useEffect(() => {
        dispatch(listReminders());
    }, [dispatch]);

    const handleReminderChange = (event) => {
        const reminderId = event.target.value;
        setSelectedReminderId(reminderId);
        const selectedReminder = reminders.find(reminder => reminder.id === reminderId);

        if (selectedReminder) {
            setEmail(selectedReminder.email);
            setContactNo(selectedReminder.contact_no);
            setSmsNo(selectedReminder.sms_no);
        }
    };

    const handleDisable = () => {
        // Logic to disable the reminder...

        alert("Reminder disabled successfully!");
    }
    const handleLogout = () => {
        dispatch(logout());
        console.log("hi")
        history.push("/");
    
        window.location.reload(); // Reload the page
    
      };
    
    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Disable Reminder
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="reminder-select-label">Select Reminder</InputLabel>
                            <Select
                                labelId="reminder-select-label"
                                value={selectedReminderId}
                                onChange={handleReminderChange}
                            >
                                {reminders.map(reminder => (
                                    <MenuItem key={reminder.id} value={reminder.id}>
                                        {reminder.subject} - {reminder.date}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth required
                            label="Email Address"
                            variant="filled"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contact No"
                            variant="filled"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth
                            label="SMS No"
                            variant="filled"
                            value={smsNo}
                            onChange={(e) => setSmsNo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick={handleDisable}
                        >
                            Disable
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button} component={Link} to="/home"
                        >
                            Go Back
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Button variant="contained" color="secondary" onClick={handleLogout} className={classes.button}>
                Log out
            </Button>
        </Container>
    );
}

export default DisableReminderScreen;
