import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
//cargar las actions para exportar

// export const { } = authSlice.actions;
export default authSlice.reducer;
