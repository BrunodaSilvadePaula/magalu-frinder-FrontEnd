import axios from 'axios';

export default class Request {
  host_url = 'https://magalu-finder-bruno.herokuapp.com';
  headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  request = (url, method = 'GET', data = {}, params = {}) => {

    if(url !== '/api-token-auth/'){
      let token = sessionStorage.getItem('token');
      this.headers ={
        ...this.headers,
        'Authorization': 'Token ' + token
      }
    }

    url = url.startsWith('http') || url.startsWith('https') ? url : this.host_url + url;

    const options = {
      method, data, url
    }
    if (method.toUpperCase() === 'GET') {
      options.data = undefined;
      options.params = data;
    }

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method,
        data: options.data,
        headers: this.headers
      })
        .then(response => {
          if(response.status === 200 || response.status === 202 || response.status === 201 ||
              response.status === 204){
            resolve(response)
          }else{
            reject(response)
          }
        })
        .catch(err => {
          reject(err.response)
        })
    });
  }
}
