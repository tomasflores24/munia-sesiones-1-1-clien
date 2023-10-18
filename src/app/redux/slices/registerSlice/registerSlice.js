import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    setParts: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    cleanParts: () => {
      return { ...initialState };
    },
  },
});

export const { setParts, cleanParts } = registerSlice.actions;

export default registerSlice.reducer;
