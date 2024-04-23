// watchlistSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const initialState = {
    coins: [],
    loading: false,
    error: null,
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlist(state, action) {
            state.coins = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setWatchlist, setLoading, setError } = watchlistSlice.actions;

export const fetchWatchlist = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const coinRef = doc(db, 'watchlist', userId);
        const unsubscribe = onSnapshot(coinRef, (snapshot) => {
            if (snapshot.exists()) {
                dispatch(setWatchlist(snapshot.data().coins));
            } else {
                dispatch(setWatchlist([])); // Clear watchlist if document doesn't exist
            }
        }, (error) => {
            dispatch(setError(error.message));
        });
        return () => unsubscribe(); // Return unsubscribe function
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const selectWatchlist = (state) => state.watchlist.coins;

export default watchlistSlice.reducer;
