import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { listReminders } from "../redux/slices/reminderSlice"; // Import the Redux action
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import emailjs from "emailjs-com";
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
function EnableReminderScreen() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [smsNo, setSmsNo] = useState("");
  const [selectedReminderId, setSelectedReminderId] = useState(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminder.listReminders);

  useEffect(() => {
    dispatch(listReminders());
  }, [dispatch]);

  const handleReminderChange = (event) => {
    const reminderId = event.target.value;
    setSelectedReminderId(reminderId);
    const selectedReminder = reminders.find(
      (reminder) => reminder.id === reminderId
    );

    if (selectedReminder) {
      setEmail(selectedReminder.email);
      setContactNo(selectedReminder.contact_no);
      setSmsNo(selectedReminder.sms_no);
    }
  };

  const handleEnable = () => {
    // console.log(`Enabling reminder with ID ${selectedReminderId}`);
    alert("Reminder enabled successfully!");
    sendEmail();
    // Logic to enable the reminder...
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const sendEmail = () => {
    if (checked) {
    const selectedReminder = reminders.find(reminder => reminder.id === selectedReminderId);

      const messageContent = `
            This is a reminder for your scheduled event:
            Subject: ${selectedReminder.subject}
            Date: ${selectedReminder.date}
        `;

      const templateParams = {
        email: email,
        phone: contactNo, // Assuming contactNo is the phone number
        message: messageContent, // Customize the message as needed
      };

      emailjs
        .send(
          "service_ud2ywtz",
          "template_ob8zmhe",
          templateParams,
          "m_K_oxFN994IB74UA"
        )
        .then(
          (response) => {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
          },
          (err) => {
            console.log("Failed to send email.", err);
          }
        );
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    console.log("hi")
    history.push("/");

    window.location.reload(); // Reload the page

  };
   

  // ... No need for another EnableReminderScreen function, it seems to have been accidentally duplicated ...

  // ... rest of your component, unchanged ...

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Enable Reminder
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="reminder-select-label">
                Select Reminder
              </InputLabel>
              <Select
                labelId="reminder-select-label"
                value={selectedReminderId}
                onChange={handleReminderChange}
              >
                {reminders.map((reminder) => (
                  <MenuItem key={reminder.id} value={reminder.id}>
                    {reminder.subject} - {reminder.date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Set an Email Notfication"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleEnable}
            >
              Enable
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/home"
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

export default EnableReminderScreen;
