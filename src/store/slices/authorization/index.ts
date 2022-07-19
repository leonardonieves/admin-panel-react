/* eslint-disable prefer-promise-reject-errors */
import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user');

export const userSlice = createSlice({
  name: 'activeUser',
  initialState: {
    user: user
      ? { isLoggedIn: true, user: JSON.parse(user) }
      : { isLoggedIn: false, user: null },   
    msg:  'initial'
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {isLoggedIn: true, user: action.payload} ;
      state.msg = 'login successfully';
    },
    loginFail: (state, action) => {
      state.user = {isLoggedIn: false, user: null} ;
      state.msg = action.payload;      
    },
    logOut: (state, action) => {
      state.user = {isLoggedIn: false, user: null} ;
      state.msg = 'logout successfully';
    }
  }
});

export const { loginSuccess, loginFail, logOut } =
  userSlice.actions;

export default userSlice.reducer;
