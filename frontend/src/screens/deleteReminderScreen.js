import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
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

    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [reminder, setReminder] = useState('');
    const [description, setDescription] = useState('');

    // Placeholder function to handle data fetching or processing
    const updateFieldsBasedOnDate = () => {
        // Update 'subject' and other fields based on selected 'date'
    };

    const updateFieldsBasedOnSubject = () => {
        // Update 'reminder' and 'description' based on selected 'subject'
    };

    return (
        <Container className={classes.container} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Delete Reminder
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="date"
                            label="Select Date"
                            type="date"
                            InputProps={{
                                startAdornment: <CalendarTodayIcon />
                            }}
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                updateFieldsBasedOnDate();
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="subject-label">Select Subject</InputLabel>
                            <Select
                                labelId="subject-label"
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    updateFieldsBasedOnSubject();
                                }}
                            >
                                {/* Sample list of subjects */}
                                <MenuItem value={"Subject 1"}>English</MenuItem>
                                <MenuItem value={"Subject 2"}>Mathematics</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="reminder-label">Reminders</InputLabel>
                            <Select
                                labelId="reminder-label"
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                            >
                                {/* Sample list of reminders */}
                                <MenuItem value={"Reminder 1"}>Reminder 1 - First 30 chars of description</MenuItem>
                                <MenuItem value={"Reminder 2"}>Reminder 2 - First 30 chars of description</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            rowsMin={4}
                            placeholder="Description"
                            value={description}
                            readOnly
                            style={{ width: '100%', padding: '5px' }}
                        />
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
