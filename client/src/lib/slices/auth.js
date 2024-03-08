import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loggedIn: false,
  busy: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    updateLoggedInState(state, action) {
      state.loggedIn = action.payload;
    },
    updateBusyState(state, action) {
      state.busy = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
});

export const {
  updateLoggedInState,
  updateProfile,
  updateBusyState,
  clearProfile,
} = authSlice.actions;



export const getAuthState = (state) => state.auth; 

export default authSlice.reducer;
