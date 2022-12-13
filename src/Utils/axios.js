import axios from "axios"

const instance = axios.create({
    baseURL: "https://guitar-backend.onrender.com/"
})


export default instance
