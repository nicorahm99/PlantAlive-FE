import {reactLocalStorage} from 'reactjs-localstorage';


export function getUserDataFromStorage(){
    return reactLocalStorage.getObject("userData")
}

export function logOut(history){
    reactLocalStorage.clear()
    history.push("/")
}