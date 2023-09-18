import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { listReminders, getReminderDetails, modifyReminder } from '../redux/slices/reminderSlice';
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

function ModifyReminderScreen() {
    const classes = useStyles();
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [reminder, setReminder] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [selectedReminderId, setSelectedReminderId] = useState(null);
    const history = useHistory();

    const dispatch = useDispatch();
    const reminders = useSelector(state => state.reminder.listReminders);
console.log(reminders)
    useEffect(() => {
        dispatch(listReminders());
    }, [dispatch]);

    const handleReminderChange = (event) => {
        const reminderId = event.target.value;
        setSelectedReminderId(reminderId);
        const selectedReminder = reminders.find(reminder => reminder.id === reminderId);

        if (selectedReminder) {
            setDate(selectedReminder.date);
            setSubject(selectedReminder.subject);
            setEmail(selectedReminder.email);
            setContactNo(selectedReminder.contact_no);
            setSmsNo(selectedReminder.sms_no);
            // Add other fields as necessary
        }
    };
    const handleConfirm = async () => {
        try {
            const updatedReminder = {
                email,
                contact_no: contactNo,
                sms_no: smsNo
                // Add other fields as necessary
            };
            console.log(updatedReminder)
          
            dispatch(modifyReminder(selectedReminderId, updatedReminder));
            alert('Reminder modified successfully!');

         } catch (error) {
            console.error("Failed to update reminder:", error);
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        console.log("hi")
        history.push("/");
    
        window.location.reload(); // Reload the page
    
      };
    
    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Modify Reminder
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
                            onClick={handleConfirm}
                        >
                            Confirm
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

export default ModifyReminderScreen;
