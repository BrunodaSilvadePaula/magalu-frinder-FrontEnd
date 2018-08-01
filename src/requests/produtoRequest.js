import Request from './requests.js';

export default class ProdutoRequest extends Request{

  getProdutos(){
    return this.request('/produto/');
  }

  createProduto(obj){
    return this.request('/produto/', 'POST', obj);
  }

  updateProduto(obj){
    return this.request(`/produto/${obj.id}/`, 'PUT', obj);
  }

  deleteProduto(id){
    return this.request(`/produto/${id}/`, 'DELETE');
  }
}
