// registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  },
  // ...otros estados relacionados con la documentación y servicios si los tienes...
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    //Ir a la siguiente pestaña del registro
    nextStep: (state) => {
      state.currentStep += 1;
    },
    //Volver atras pestaña del registro

    backStep: (state) => {
      state.currentStep -= 1;
    },
    savePersonalInfo: (state, action) => {
      state.personalInfo = { ...action.payload };
    },
    // updatePersonalInfo: (state, action) => {
    //   state.personalInfo = { ...state.personalInfo, ...action.payload };
    // },
    // ...otros reducers para actualizar otros estados...
  },
});

export const { updatePersonalInfo, nextStep, backStep,savePersonalInfo } =
  registrationSlice.actions;

export default registrationSlice.reducer;
