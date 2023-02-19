import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      const token = cookies.get("nfcToken");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: `/login`,
        method: "POST",
        body: user,
      }),
    }),
    getUsers: builder.query({
      query: () => "/users/info",
      providesTags: ["User"],
    }),
    getUser: builder.mutation({
      query: ({ user_id }) => ({
        url: `/users/${user_id}`,
        method: "GET",
        invalidatesTags: ["User"],
      }),
    }),
    userInfo: builder.mutation({
      query: ({ formData }) => ({
        url: `/users/info`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserInfoMutation,
} = userApi;
