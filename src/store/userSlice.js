import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        login: false,
        id: sessionStorage.getItem("id"),
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email")
    },
    reducers: {
        login: (state, action)=>{
            state.login = true
            state.id = action.payload.id
            state.token = action.payload.token
            state.email = action.payload.email

            sessionStorage.setItem("id", action.payload.id)
            sessionStorage.setItem("token", action.payload.token)
            sessionStorage.setItem("email", action.payload.email)
        },
        signup: (state) =>{
            state.login= false
            state.id = ""
        }
    }   
})

export const userActions = userSlice.actions;
export default userSlice.reducer;