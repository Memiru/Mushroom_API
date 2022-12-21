import * as api from "./mushroomApi"

export const keyTransfer = (api_key) =>{
    localStorage.setItem("api_key",api_key);

    return api.apiResult(api_key);
}

export const defaultKey = () => {
    var api_key = localStorage.getItem('api_key');

    if(api_key!=null){
        return api_key;
    }else{
        return "";
    }
}