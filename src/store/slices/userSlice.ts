import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {
    address: "",
    lastName: "",
    firstName: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload || {};
    },
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
