import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem("authToken");
  } else {
    return await SecureStore.getItemAsync("authToken");
  }
};

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const token = await getToken();
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", ` ${token}`);
        console.log("customBaseQuery:", token);
      }
      return headers;
    },
  });
  return baseQuery(args, api, extraOptions);
};

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customBaseQuery,
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    // 👇👇===================getTasks====================================👇👇

    getTasks: builder.query({
      //📒📒TaskData[] →getTasks will return an array of tasks, not just one task.
      // void →getTasks does not require parameters (it simply fetches all tasks).
      query: () => ({
        url: "/api/v1/task/get-tasks",
      }),
      providesTags: ["tasks"],
    }),

    // 👇👇===================getTask=====================================👇👇
    getTask: builder.query({
      query: (id) => ({
        url: `/api/v1/task/get-task/${id}`,
      }),
      providesTags: ["tasks"],
    }),

    // 👇👇===================createTask=================================👇👇
    createTask: builder.mutation({
      query: ({ taskData }) => ({
        url: "/api/v1/task/create-task",
        method: "POST",
        body: {
          enteredTitle: taskData.title,
          enteredDescription: taskData.description,
          enteredTaskStatus: taskData.status,
          enteredDateWeb: taskData.dueDate,
        },
      }),
      invalidatesTags: ["tasks"],
    }),
    // 👇👇===================updateTask=================================👇👇

    updateTask: builder.mutation({
      query: ({ id, taskData }) => ({
        url: `/api/v1/task/update-task/${id}`,
        // url: `/api/v1/task/get-task/${id}`,
        method: "PATCH",
        body: {
          enteredTitle: taskData.enteredTitle,
          enteredDescription: taskData.enteredDescription,
          enteredTaskStatus:taskData.enteredTaskStatus,
          enteredDate:taskData.enteredDateWeb
        },
      }),
      invalidatesTags:["tasks"]
    }),

    deleteTask:builder.mutation({
      query:(id)=>({
        url:`/api/v1/task/delete-task/${id}`,
        method:"DELETE"
      }),
      invalidatesTags:["tasks"]
    })
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskApi;
