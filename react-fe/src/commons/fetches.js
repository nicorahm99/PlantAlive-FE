export const baseUrl = 'http://localhost:8080';

export function buildGetRequest(url, body){
    const request = () => fetch(baseUrl + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
      });
    return request; 
}

export function buildPostRequest(url, body){
    return () => fetch(baseUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
      });
}