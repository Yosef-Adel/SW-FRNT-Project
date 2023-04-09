import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState } from "react";


// To get the values of token and id from local storage
const user =JSON.parse(JSON.parse(window.localStorage.getItem('persist:root')).user);
// console.log(user)
const url = process.env.API_URL || "https://sw-backend-project.vercel.app/"

const instance  = axios.create({
    baseURL: url,
    headers: {
        Authorization: "Bearer "+ user.token,
        ID: user.id
    }
})

export default instance