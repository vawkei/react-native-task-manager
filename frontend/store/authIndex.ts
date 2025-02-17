import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { AuthState } from "@/interfaces/interface";
import { Platform } from "react-native";

// export interface User {
//     email: string;
//     isAuthenticated: boolean;
//   };

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    SET_REGISTERED_USER(
      state: AuthState,
      action: PayloadAction<{ msg: string; user: any }>
    ) {
      console.log(action.payload);
      // state.isLoggedIn = true; shld be true when a user logs in and not register
      state.user = action.payload.user;
      state.message = action.payload.msg;
    },
    SET_LOGGEDIN_USER(
      state: AuthState,
      action: PayloadAction<{ msg: string; token: string; user: any }>
    ) {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.token = action.payload.token;
      //📒📒 localStorage works only with web:📒📒
      // localStorage.setItem("token", JSON.stringify(state.token));
      // localStorage.setItem("isLoggedInLs", JSON.stringify(state.isLoggedIn));
      state.isSuccess = true;
      state.user = action.payload.user;
      state.message = action.payload.msg;
      storeToken(action.payload.token);
    },
    SET_LOGGEDOUT_USER(state, action) {
      console.log("dispatch from (app) index:", action.payload);
      state.message = action.payload.msg;
      removeToken();
    },

    RESET_AUTH(state: AuthState) {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
    },
  },
});

export const {
  RESET_AUTH,
  SET_REGISTERED_USER,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
} = authSlice.actions;

async function storeToken(token: string) {
  try {

    if (Platform.OS === "web") {
      
      await AsyncStorage.setItem("authToken", token);
      const webToken = await AsyncStorage.getItem("authToken");
      console.log("storing token for web:",webToken);
    
    } else {
      
      await SecureStore.setItemAsync("authToken", token);
      
      const mobileToken = await SecureStore.getItemAsync("authToken")
      console.log("storing token for mobile:",mobileToken);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error storing token:", message);
  }
}

async function removeToken() {
  try {

    if(Platform.OS==="web"){
      await AsyncStorage.clear()
    }else{
      await SecureStore.deleteItemAsync("authToken");
    }
    
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error removing token:", message);
  }
}
