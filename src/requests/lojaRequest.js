import Request from './requests.js';

export default class LojaRequest extends Request{

  getLojas(){
    return this.request('/loja/');
  }

  createLoja(obj){
    return this.request('/loja/', 'POST', obj);
  }

  associaProduto(obj){
    return this.request(`/loja/${obj.id}/associa_produtos/`, 'POST', obj);
  }

  updateLoja(obj){
    return this.request(`/loja/${obj.id}/`, 'PUT', obj);
  }

  deleteLoja(id){
    return this.request(`/loja/${id}/`, 'DELETE');
  }

  busca_produtos(cep, produto){
    return this.request(`/loja/busca_produtos/?cep=${cep}&produto=${produto}`, 'GET')
  }
}
