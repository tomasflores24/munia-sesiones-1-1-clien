// registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";
const personalInfoInitial = {
  imageUser: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const initialState = {
  currentStep: 1,
  dataUser: personalInfoInitial,
  documentationUser: {},
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
      state.dataUser = { ...action.payload };
    },
    resetPersonalInfo: (state) => {
      state.dataUser = personalInfoInitial;
    },
    saveDocumentationUser: (state, action) => {
      console.log(action.payload, "esto llega de documentacion")
      state.documentationUser = action.payload;
    },
  },
});

export const {
  updatePersonalInfo,
  nextStep,
  backStep,
  savePersonalInfo,
  resetPersonalInfo,
  saveDocumentationUser
} = registrationSlice.actions;

export default registrationSlice.reducer;
