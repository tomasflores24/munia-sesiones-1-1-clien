import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: {
    id: "",
    email: "",
    name: "",
    phone: 0,
    userType: "", // userType en string,
    userTypeId: 4,
    picture: "",
    addressId: 0,
    companyId: "",
    collaboratorId: "",
    providerId: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDataSuccess: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    logOut: () => {
      return {
        ...initialState,
      };
    },
  },
});

//cargar las actions para exportar
export const { setDataSuccess } = authSlice.actions;

export const selectUser = (state) => state.auth.auth.user;

export default authSlice.reducer;
