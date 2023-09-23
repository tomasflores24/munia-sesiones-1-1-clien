import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: {
    profilePic: {
      src: "",
      file: null,
    },
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    antPenales: {
      name: "",
      file: null,
    },
    diploma: {
      name: "",
      file: null,
    },
    tarjProf: {
      name: "",
      file: null,
    },
    portServicios: {
      name: "",
      file: null,
    },
  },
  reducers: {
    setParts: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setParts } = registerSlice.actions;

export default registerSlice.reducer;
