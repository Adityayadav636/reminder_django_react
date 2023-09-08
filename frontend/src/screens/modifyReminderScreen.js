import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Checkbox, FormControlLabel } from '@material-ui/core';
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

function ModifyReminderScreen() {
    const classes = useStyles();

    // Dummy state for demonstration
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [reminder, setReminder] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    //... more state as needed
    const handleDateChange = (newDate) => {
        setDate(newDate);
     };

    const handleSubjectChange = (newSubject) => {
        setSubject(newSubject);
     };
    return (
        <Container className={classes.container} maxWidth="md">
        <Typography variant="h4" gutterBottom>
            Modify Reminder
        </Typography>
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
          
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
                    <Button variant="contained" color="primary" className={classes.button}>
                Confirm
            </Button> 
            <Button variant="contained" color="primary" className={classes.button}>
                Cancel
            </Button>
                {/* Other fields (description, email, contactNo, smsNo, and recurOptions) go here */}
            </Grid>
           
        </Paper>
        <Button variant="contained" color="secondary" className={classes.button}>
                Log out
            </Button>
    </Container>
    );
}

export default ModifyReminderScreen;
