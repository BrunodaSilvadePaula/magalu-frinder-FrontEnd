import Request from './requests.js';

export default class UsuarioRequest extends Request{

  getUsuarios(){
    return this.request('/usuario/');
  }

  createUsuario(obj){
    return this.request('/usuario/', 'POST', obj);
  }
}
