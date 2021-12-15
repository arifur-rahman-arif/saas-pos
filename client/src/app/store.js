import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "../features/alert/alertSlice";
import { authApi } from "../services/auth";

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
