import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    // 👇👇===================REGISTER===========================👇👇

    register: builder.mutation({
      query: ({userData}) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },

      }),
      invalidatesTags: ["auth"],
    }),

    // 👇👇===================LOGIN===========================👇👇
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: { email: email, password: password },
      }),
      invalidatesTags: ["auth"],
    }),

    // 👇👇===================LOGOUT=========================👇👇
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
