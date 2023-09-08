import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedReminders, setSelectedReminders] = useState([]);

    // Placeholder function to handle selecting reminders
    const handleSelectReminder = (reminder) => {
        // Add or remove 'reminder' from 'selectedReminders' based on user selection
        if (selectedReminders.includes(reminder)) {
            setSelectedReminders(selectedReminders.filter((r) => r !== reminder));
        } else {
            setSelectedReminders([...selectedReminders, reminder]);
        }
    };

    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                View Your Reminders
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                                {/* Sample list of subjects */}
                                <MenuItem value={"Subject 1"}>English</MenuItem>
                                <MenuItem value={"Subject 2"}>Mathematics</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Table headers */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Your Reminders</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Reminder Name</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Reminder Subject</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Reminder Description</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Email Address</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Contact No</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">SMS No</Typography>
                    </Grid>
                    {/* Render reminders */}
                    {dummyReminders.map((reminder) => (
                        <React.Fragment key={reminder.id}>
                            <Grid item xs={2}>
                                {reminder.name}
                            </Grid>
                            <Grid item xs={2}>
                                {reminder.subject}
                            </Grid>
                            <Grid item xs={2}>
                                {reminder.description}
                            </Grid>
                            <Grid item xs={2}>
                                {reminder.email}
                            </Grid>
                            <Grid item xs={2}>
                                {reminder.contactNo}
                            </Grid>
                            <Grid item xs={2}>
                                {reminder.smsNo}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedReminders.includes(reminder.id)}
                                            onChange={() => handleSelectReminder(reminder.id)}
                                            color="primary"
                                        />
                                    }
                                    label="Select"
                                />
                            </Grid>
                            <br/>
                        </React.Fragment>
                    ))}
                </Grid>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Log Out
                </Button>
            </Paper>
        </Container>
    );
}

export default ViewRemindersScreen;

// Dummy data for reminders (replace with your actual data)
const dummyReminders = [
    {
        id: 1,
        name: 'Reminder 1',
        subject: 'English',
        description: 'This is a reminder for English class.',
        email: 'example@example.com',
        contactNo: '123-456-7890',
        smsNo: '987-654-3210',
    },
    {
        id: 2,
        name: 'Reminder 2',
        subject: 'Mathematics',
        description: 'This is a reminder for Mathematics class.',
        email: 'sample@example.com',
        contactNo: '987-654-3210',
        smsNo: '123-456-7890',
    },
];
