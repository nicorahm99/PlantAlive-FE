import {reactLocalStorage} from 'reactjs-localstorage';


export function getUserDataFromStorage(){
    return reactLocalStorage.getObject("userData")
}