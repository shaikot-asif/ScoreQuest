import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

// export default { userActions, userReducer };
