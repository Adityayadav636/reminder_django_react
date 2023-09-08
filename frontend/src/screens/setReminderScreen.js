import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createReminder } from '../redux/slices/reminderSlice';

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
    const dispatch = useDispatch(); // Add this to use the Redux dispatch function

    //... Add other state variables as required.

    const handleSubmit = () => {
        const reminderData = {
            date: date, // Assuming you've defined a state for date
            subject,
            description,
            email,
            contactNo,
            smsNo
            // Add other fields as necessary
        };
        
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
                                <MenuItem value={"Subject 1"}>English</MenuItem>
                                <MenuItem value={"Subject 2"}>Mathematics</MenuItem>
                                <MenuItem value={"Subject 3"}>Science</MenuItem>
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
                        />
                        <FormControlLabel
                            control={<Checkbox name="5Days" />}
                            label="5 Days"
                        />
                        <FormControlLabel
                            control={<Checkbox name="3Days" />}
                            label="3 Days"
                        />
                        <FormControlLabel
                            control={<Checkbox name="2Days" />}
                            label="2 Days"
                        />
                    </Grid>
                </Grid>\
                 
                <Button variant="contained" color="primary" className={classes.button}>
                Confirm
            </Button> 
            <Button variant="contained" color="primary" className={classes.button}>
                Cancel
            </Button>
            </Paper>
            <Button variant="contained" color="secondary"      onClick={handleSubmit} className={classes.button}>
                Log out
            </Button>
        </Container>
    );
}

export default SetReminderScreen;
