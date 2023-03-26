import axios from "axios";

const instance  = axios.create({
    baseURL: "https://envie-backend.vercel.app/",
    headers: {
        Authorization: "Bearer "+ sessionStorage.getItem("tokenValue"),
        ID: sessionStorage.getItem("ID")
    }
})

export default instance