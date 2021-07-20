import { AxiosRequest } from "./AxiosRequest";





// -------------- do get request for user data
export const getUser = async (token=null) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Headers": "X-Requested-With, privatekey"
    }
    const url = `https://api-nodejs-todolist.herokuapp.com/user/me`;
    const method = "GET";

    const response = await AxiosRequest(url, null, headers, method);
    return response;
}