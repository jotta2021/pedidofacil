import axios,{AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/error";
import { singOut } from "../context";
export function setupApiConfig(ctx = undefined){
    let cookies = parseCookies(ctx);


    const api = axios.create({
        baseURL:'http://localhost:3333',
headers: {
    Authorization:`Bearer ${cookies['@auth.token']}`
}
    })

    api.interceptors.response.use(response=>  {
        return response;
    }, (error:AxiosError)=> {
if(error.response?.status ===401){
    // nao autorizado, desloga o usuario
    if(typeof window!== undefined){
singOut()
    }else{
        return Promise.reject( new AuthTokenError())
    }
} 
return Promise.reject(error)
    })

    return api;
}