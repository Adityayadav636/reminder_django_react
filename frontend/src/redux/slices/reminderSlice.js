import { createSlice } from '@reduxjs/toolkit';
import reminderAPI from '../../mocks/reminder';

const initialState = {
  listReminders: [],
  reminderDetails: {},
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    getReminderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getReminderDetailsSuccess(state, action) {
      state.reminderDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getReminderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    createReminderSuccess(state, action) {
      state.listReminders.push(action.payload);
      state.reminderDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    createReminderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    modifyReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    modifyReminderSuccess(state, action) {
      // Logic to modify the reminder in state.listReminders based on action.payload
      state.loading = false;
      state.error = null;
    },
    modifyReminderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteReminderSuccess(state, action) {
      // Logic to remove the reminder from state.listReminders based on action.payload
      state.loading = false;
      state.error = null;
    },
    deleteReminderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    listRemindersStart(state) {
      state.loading = true;
      state.error = null;
    },
    listRemindersSuccess(state, action) {
      state.listReminders = action.payload;
      state.loading = false;
      state.error = null;
    },
    listRemindersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export your actions
export const {
  getReminderDetailsStart, 
  getReminderDetailsSuccess, 
  getReminderDetailsFailure,
  createReminderStart, 
  createReminderSuccess, 
  createReminderFailure,
  modifyReminderStart, 
  modifyReminderSuccess, 
  modifyReminderFailure,
  deleteReminderStart, 
  deleteReminderSuccess, 
  deleteReminderFailure,
  listRemindersStart, 
  listRemindersSuccess, 
  listRemindersFailure,
} = reminderSlice.actions;

// Export your asynchronous actions (like API calls) here...
// Example for creating a reminder:
export const createReminder = (reminder) => async (dispatch) => {
  try {
    dispatch(createReminderStart());
    console.log("pending");
    const createdReminder = await reminderAPI.createReminder(reminder);
    dispatch(createReminderSuccess(createdReminder));
  } catch (error) {
    dispatch(createReminderFailure(error.message));
  }
};
export const getReminderDetails = (reminderId) => async (dispatch) => {
    try {
      dispatch(getReminderDetailsStart());
      const reminderDetails = await reminderAPI.getReminderDetails(reminderId);
      dispatch(getReminderDetailsSuccess(reminderDetails));
    } catch (error) {
      dispatch(getReminderDetailsFailure(error.message));
    }
  };
  
  export const modifyReminder = (reminderId, updatedReminder) => async (dispatch) => {
    try {
      dispatch(modifyReminderStart());
      const modifiedReminder = await reminderAPI.modifyReminder(reminderId, updatedReminder);
      dispatch(modifyReminderSuccess(modifiedReminder));
    } catch (error) {
      dispatch(modifyReminderFailure(error.message));
    }
  };
  
  export const deleteReminder = (reminderId) => async (dispatch) => {
    try {
      dispatch(deleteReminderStart());
      await reminderAPI.deleteReminder(reminderId);
      dispatch(deleteReminderSuccess(reminderId)); // You might want to pass reminderId or any other required data
    } catch (error) {
      dispatch(deleteReminderFailure(error.message));
    }
  };
  
  export const listReminders = () => async (dispatch) => {
    try {
      dispatch(listRemindersStart());
      const allReminders = await reminderAPI.listReminders();
      dispatch(listRemindersSuccess(allReminders));
    } catch (error) {
      dispatch(listRemindersFailure(error.message));
    }
  };
  
// ... Do the same for your other asynchronous actions...

export const { reducer } = reminderSlice;
export default reminderSlice.reducer; // Note: Usually, it's .reducer instead of just the slice object.
