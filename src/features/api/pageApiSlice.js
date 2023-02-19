import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const pagesApi = createApi({
  reducerPath: "pages",
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
  tagTypes: ["Pages"],
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => "/pages",
      providesTags: ["Pages"],
    }),
    getPageById: builder.mutation({
      query: ({ id }) => ({
        url: `/pages/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Pages"],
    }),
    createPage: builder.mutation({
      query: ({ page }) => ({
        url: "/pages",
        method: "POST",
        body: page,
      }),
      invalidatesTags: ["Pages"],
    }),
    updatePage: builder.mutation({
      query: ({ page }) => ({
        url: `/pages/${page.user_id}`,
        method: "PUT",
        body: page,
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useGetPagesQuery,
  useGetPageByIdMutation,
  useCreatePageMutation,
  useUpdatePageMutation,
} = pagesApi;
