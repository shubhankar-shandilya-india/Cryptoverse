import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice";
import userSlice from "./userSlice";
import watchlistSlice from "./watchlistSlice";

const store = configureStore({
    reducer:{
        currency:currencySlice,
        user:userSlice,
        watchlist:watchlistSlice,
    },
})

export default store;