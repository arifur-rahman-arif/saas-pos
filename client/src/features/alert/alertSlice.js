import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertValue: false,
    alertType: "success",
    alertMessage: "This is a message",
};

const alertSlice = createSlice({
    name: "alertSlice",
    initialState,
    reducers: {
        handleAlert: (state, action) => {
            const { showAlert, alertType, alertMessage } = action.payload;

            state.alertValue = showAlert;
            state.alertType = alertType || state.alertType;
            state.alertMessage = alertMessage || state.alertMessage;
        },
    },
});

export const { handleAlert } = alertSlice.actions;

export default alertSlice.reducer;
