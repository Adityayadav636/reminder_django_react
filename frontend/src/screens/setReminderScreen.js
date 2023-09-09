import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createReminder } from '../redux/slices/reminderSlice';
import { useHistory, Link } from "react-router-dom";

import {
    Button, Typography, Container, Grid, Paper, TextField, FormControl, 
    InputLabel, Select, MenuItem, TextareaAutosize, Checkbox, FormControlLabel 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
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

function SetReminderScreen() {
    const classes = useStyles();

    // State (You can expand on these with useState as required)
    const [subject, setSubject] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [contactNo, setContactNo] = React.useState('');
    const [smsNo, setSmsNo] = React.useState('');
    const [date, setDate] = React.useState('');  // Declare the date state variable
    const [recurrence, setRecurrence] = React.useState('');

    const dispatch = useDispatch();

    const loading = useSelector(state => state.reminder.loading);
    const error = useSelector(state => state.reminder.error);
    const reminderDetails = useSelector(state => state.reminder.reminderDetails);
    const [hasAlerted, setHasAlerted] = useState(false);

    useEffect(() => {
        if (!loading && error) {
            alert(`Error: ${error}`);
          } else if (!loading && !error && reminderDetails && Object.keys(reminderDetails).length > 0 && !hasAlerted) {
            alert('Reminder created successfully!');
            setHasAlerted(true);
        }
    }, [loading, error, reminderDetails]);
    //... Add other state variables as required.
    const handleRecurrenceChange = (event) => {
        if (event.target.checked) {
            setRecurrence(event.target.name);
        } else {
            setRecurrence('');
        }
    };
    
    const handleSubmit = () => {
        const reminderData = {
            date: date, // Assuming you've defined a state for date
            subject,
            description,
            email,
            contact_no: contactNo,  // Note the change in field name
            sms_no: smsNo,
            recurrence: recurrence

            // Add other fields as necessary
        };
        console.log(reminderData)
        console.log("hello")
        // Now, instead of making the API call directly, you'll dispatch the Redux action:
        dispatch(createReminder(reminderData));
    };

    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Set a new Reminder
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required
                            fullWidth
                            id="date"
                            label="Select a Date"
                            type="date"
                            value={date}  // Bind the date state variable
                            onChange={(e) => setDate(e.target.value)}  // Update state when the date changes
        
                            InputProps={{
                                startAdornment: <CalendarTodayIcon />
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="subject-label">Subject</InputLabel>
                            <Select required
                                labelId="subject-label"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            >
                                {/* Sample list of subjects */}
                                <MenuItem value={"English"}>English</MenuItem>
                                <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
                                <MenuItem value={"Science"}>Science</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required
                            rowsMin={4}
                            placeholder="Add description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    {/* Add other fields like Email Address, Contact No, SMS No */}
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
                        <Typography variant="subtitle1">Recur for next:</Typography>
                        <FormControlLabel
                            control={<Checkbox name="7Days" />}
                            label="7 Days"
                            checked={recurrence === '7Days'} 
                            onChange={handleRecurrenceChange} 
                        />
                        <FormControlLabel
                            control={<Checkbox name="5Days" />}
                            label="5 Days"
                            checked={recurrence === '5Days'} 
                            onChange={handleRecurrenceChange} 
                        />
                        <FormControlLabel
                            control={<Checkbox name="3Days" />}
                            label="3 Days"
                            checked={recurrence === '3Days'} 
                            onChange={handleRecurrenceChange} 
                        />
                        <FormControlLabel
                            control={<Checkbox name="2Days" />}
                            label="2 Days"
                            checked={recurrence === '2Days'} 
                            onChange={handleRecurrenceChange} 
                        />
                    </Grid>
                </Grid>\
                 
            <Button variant="contained" color="primary"  onClick={handleSubmit} className={classes.button}>
                Confirm
            </Button> 
            <Button variant="contained" color="primary" component={Link} to="/home" className={classes.button}>
                Go back
            </Button>
            </Paper>
            <Button variant="contained" color="secondary"      className={classes.button}>
                Log out
            </Button>
        </Container>
    );
}

export default SetReminderScreen;
