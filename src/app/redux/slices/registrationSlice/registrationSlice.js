import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
});
//cargar las actions para exportar
// export const {  } = registrationSlice.actions;
export default registrationSlice.reducer;
