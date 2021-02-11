const os = require("os");
const hostname = os.hostname();

export const baseUrl = `http://${hostname}:8080`;

export function buildGetRequest(url){
    const request = () => fetch(baseUrl + url, {
        method: 'GET',
      });
    return request; 
}

export function buildPostRequest(url, body){
    return () => fetch(baseUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) 
      });
}

export const fetchImage = async (id) => {
  const response = await fetch(baseUrl + `/images/${id}`)
  if (response.status === 200){
      console.log(response)
      const responseBody = await response.json()
      const base64Data = responseBody.picByte;
      const image = 'data:image/jpeg;base64,' + base64Data;

      return image
  }      
}