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

export function buildPutRequest(url, body){
  return () => fetch(baseUrl + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) 
    });
}

export const fetchImage = async (id) => {
  const response = await fetch(baseUrl + `/images/${id}`)
  if (response.status === 200){
      const responseBody = await response.json()
      const base64Data = responseBody.picByte;
      const image = 'data:image/jpeg;base64,' + base64Data;

      return image
  }      
}

export const postImage = async (plantId, image) => {
  var data = new FormData();
  data.append("imageFile", image);
  const request = fetch(baseUrl + `/images/upload/${plantId}`, {
      mode: 'no-cors',
      method: "POST",
      body: data
    })
  const response = await request
  return response;
}


export const uploadFile = (plantId, file) => {
  console.info("Uploading file...");
  const API_ENDPOINT = baseUrl + `/images/upload/${plantId}`;
  const request = new XMLHttpRequest();
  const formData = new FormData();
  console.info(file);

  request.open("POST", API_ENDPOINT, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.info(request.responseText);
    }
  };
  formData.append("imageFile", file);
  request.send(formData);
};

export const deletePlant = async (plantId) => {
  return await fetch(baseUrl + `/plants/${plantId}`, {
    method: 'DELETE',
  });
}