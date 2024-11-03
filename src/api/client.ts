import axios from "axios";

export const httpClient = () =>{
    return axios.create({
        baseURL : "https://dummyjson.com",
         },
    );
};  