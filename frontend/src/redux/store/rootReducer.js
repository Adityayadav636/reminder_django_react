import { reducer as userReducer } from "../slices/userSlice";
 
import { reducer as reminderReducer } from "../slices/reminderSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  user: userReducer,
  
  reminder: reminderReducer,
});
