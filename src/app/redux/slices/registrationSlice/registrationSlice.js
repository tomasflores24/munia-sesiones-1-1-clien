// registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const personalInfoInitial = {
  imageUser: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const initialState = {
  currentStep: 0,
  dataUser: personalInfoInitial,
  documentationUser: {},
  professions: [],
  typeUser: "",
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
      state.documentationUser = {
        ...state.documentationUser,
        ...action.payload,
      };
    },
    saveProfession: (state, action) => {
      let professionsArray = action.payload;

      state.professions = professionsArray;
    },
    registrationUser: async (state) => {
      const userData = state.dataUser;
      const documentationUser = state.documentationUser;
      const professionsUser = state.professions;
      const typeUser = state.typeUser;
      let dataRegistrationUser = {
        ...userData,
        documentationUser: { ...documentationUser },
        professionsUser: [...professionsUser],
        typeUser,
      };
      await axios.post("/Ruta", dataRegistrationUser);
    },
    saveTypeUser: (state, action) => {
      let typeUser = action.payload;

      state.typeUser = typeUser;
    },
  },
});

export const {
  updatePersonalInfo,
  nextStep,
  backStep,
  savePersonalInfo,
  resetPersonalInfo,
  saveDocumentationUser,
  saveProfession,
  registrationUser,
  saveTypeUser,
} = registrationSlice.actions;

export default registrationSlice.reducer;
