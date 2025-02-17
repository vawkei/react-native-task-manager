import { configureStore } from "@reduxjs/toolkit";
import { authModalSlice } from "./authModalIndex";
import { authApi } from "./rtk/authApi/authApi";
import { authSlice } from "./authIndex";
import { taskApi } from "./rtk/taskApi/taskApi";
import { taskSlice } from "./rtk/taskIndex";

export const store = configureStore({
  reducer: {
    // slices
    authModal: authModalSlice.reducer,
    auth: authSlice.reducer,
    task: taskSlice.reducer,

    // rtk:
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
