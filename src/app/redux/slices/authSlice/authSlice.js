import { createSlice } from "@reduxjs/toolkit";
//import axios from "axios";

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
    userTypeId: 0,
    picture: "",
    addressId: 0,
    companyId: 0,
    colaboratorId: 0,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.user = action.payload
    }
  },
});
//cargar las actions para exportar

// eslint-disable-next-line no-unused-vars
export const loginUser = (dataUser) => async (dispatch) => {
  const user = {
    id: "1",
    email: "pedroterraf@live.com.ar",
    name:"pedro",
    password: "123456Indian",
    phone: 3564691624,
    userType: "4",
    userTypeId: 4,
    picture: "",
    addressId: 0,
    companyId: 0,
    colaboratorId: 0,
  }
  try {
    /* const response = await axios.post("http://localhost:3000/auth", dataUser); */
    console.log(user)
    dispatch(setLoginUser(/* response.data */ user));
  } catch (error) {
    console.error("Login error:", error);
  } 
}

export const {setLoginUser} = authSlice.actions;
export default authSlice.reducer;