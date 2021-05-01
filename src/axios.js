import axios from "axios"

const instance = axios.create({
    baseURL: "https://guitar-backend.herokuapp.com"
})


export default instance