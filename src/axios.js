import axios from "axios";

const instance = axios.create({
//API URL (cloud function)
    baseURL: "..."
})

export default instance;
