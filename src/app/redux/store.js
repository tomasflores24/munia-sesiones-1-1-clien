import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import registrationReducer from "./slices/registrationSlice/registrationSlice";

const store = configureStore({
    //Agregamos los slices, para combinacion de estados
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
  },
});

export default store;
