// registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";
const personalInfoInitial = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const initialState = {
  currentStep: 1,
  personalInfo: personalInfoInitial,
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
    resetPersonalInfo: (state) => {
      state.personalInfo = personalInfoInitial;
    },
  },
});

export const {
  updatePersonalInfo,
  nextStep,
  backStep,
  savePersonalInfo,
  resetPersonalInfo,
} = registrationSlice.actions;

export default registrationSlice.reducer;
