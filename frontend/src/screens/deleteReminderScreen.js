import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { listReminders, deleteReminder } from '../redux/slices/reminderSlice'; // Imported deleteReminder action
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },
    paper:{
        padding:"30px",
    },
    formControl: {
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function DeleteReminderScreen() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [selectedReminderId, setSelectedReminderId] = useState(null);

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

    const handleDelete = () => {
        dispatch(deleteReminder(selectedReminderId)); // Dispatch the delete action with the selected ID
        alert("Reminder deleted successfully!");
        window.location.reload(); // Reload the page

    };


    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Delete Reminder
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
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
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="filled"
                            value={email}
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            label="Contact No"
                            variant="filled"
                            value={contactNo}
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField 
                            fullWidth
                            label="SMS No"
                            variant="filled"
                            value={smsNo}
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button} component={Link} to="/home" 
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                <Button variant="contained" color="secondary" className={classes.button}>
                Log out
            </Button>
            </Paper>
           
        </Container>
    );
}

export default DeleteReminderScreen;
