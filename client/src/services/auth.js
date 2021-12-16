import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "api/auth/" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => {
                return {
                    url: `login`,
                    method: "POST",
                    body,
                };
            },
        }),
        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: `forgot-password`,
                    method: "PATCH",
                    body,
                };
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useForgotPasswordMutation } = authApi;
