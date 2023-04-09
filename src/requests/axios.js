import axios from "axios";

const url = process.env.API_URL || "https://sw-backend-project.vercel.app/"


const instance  = axios.create({
    baseURL: url,
    headers: {
        Authorization: "Bearer "+ sessionStorage.getItem("tokenValue"),
        ID: sessionStorage.getItem("ID")
    }
})

export default instance