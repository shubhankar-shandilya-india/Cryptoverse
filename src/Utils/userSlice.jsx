import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setactiveuser: (state, action) => {
            state.user = action.payload
        },
        setlogoutuser: state => {
            state.user = null
        }
    }
});

export const { setactiveuser, setlogoutuser } = userSlice.actions
export const selectuser = state => state.user.user
export default userSlice.reducer