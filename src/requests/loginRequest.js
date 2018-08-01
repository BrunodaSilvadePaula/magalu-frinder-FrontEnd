import Request from './requests.js';

export default class LoginRequest extends Request{

  doLogin(obj){
    return this.request('/api-token-auth/', 'POST', obj)
  }
}
