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
    dniDoc: { name: "", file: null },
    universityDegree: { name: "", file: null },
    masterDegree: { name: "", file: null },
    curriculum: { name: "", file: null },
    profesionalCard: { name: "", file: null },
    bankCertification: { name: "", file: null },
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
