import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: {
    id: "",
    email: "",
    name: "",
    phone: 0,
    userType: "", // userType en string,
    userTypeId: 4,
    picture: "",
    addressId: 0,
    companyId: 0,
    colaboratorId: 0,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
//cargar las actions para exportar

// export const { } = authSlice.actions;
export default authSlice.reducer;
