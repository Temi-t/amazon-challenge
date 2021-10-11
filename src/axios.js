import axios from "axios";

const instance = axios.create({
//API URL (cloud function)
    baseURL: "http://localhost:5001/challenge-efd56/us-central1/api"
})

export default instance;
