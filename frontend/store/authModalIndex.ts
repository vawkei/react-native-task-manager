import { createSlice } from "@reduxjs/toolkit";

interface AuthModalState{
    showModal:boolean
};

const initialAuthModalState:AuthModalState = {
    showModal:false
};

export const authModalSlice =  createSlice({
    name:"authModal",
    initialState:initialAuthModalState,
    reducers:{
        SHOW_AUTH_MODAL(state){
            state.showModal=true
        },
        HIDE_AUTH_MODAL(state){
            state.showModal=false
        }
    }
});

export const {SHOW_AUTH_MODAL, HIDE_AUTH_MODAL} = authModalSlice.actions;