import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        currency:currencySlice,
        user:userSlice,
    },
})

export default store;