import React, { Component } from 'react';
import LojaRequest from '../requests/lojaRequest';
import ProdutoRequest from '../requests/produtoRequest';
import Message from '../services/Message';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const loja = new LojaRequest();
const produto = new ProdutoRequest();

class Loja extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      descricao: '',
      cod_filial: '',
      cep: '',
      list_lojas: [],
      list_produtos: [],
      produtos: []
    }
  }
  
	handleInputChange = (event) =>{
		const target = event.target;
    let val = '';
    let val_array = [];
    if(target.type === 'select-multiple'){
      let options = target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          val_array.push(options[i].value);
        }
      }
    }else{
      val = target.type === 'checkbox' ? target.checked : target.value;
    }
    const value = val === '' ? val_array : val;
		const name = target.name;

		this.setState({
				[name]: value
		});
	}
  handleEdit = (loja) => {
    let products = [];
    for (var i = 0, l = loja.produtos.length; i < l; i++) {
      products.push(loja.produtos[i].id);
    }
    this.setState({
      id: loja.id,
      descricao: loja.descricao,
      cod_filial: loja.cod_filial,
      cep: loja.cep,
      produtos: products
    });
  }
  handleDelete = (loja) => {
     this.setState({
       id: loja.id,
       descricao: loja.descricao,
       cod_filial: loja.cod_filial,
       cep: loja.cep
     });
  }

  async componentWillMount(){
    await loja.getLojas().then(response =>{
      if(response.status === 200){
        this.setState({ list_lojas: response.data });
        produto.getProdutos().then(response => {
          if(response.status === 200){
            this.setState({ list_produtos: response.data });
          }
        })
        .catch(err => {
          Message.error('Erro', 'Tivemos um problema para buscar os produtos!');
        });
      }
    })
    .catch(err =>{
      Message.error('Erro', 'Tivemos um problema para carregar as lojas!');
    });
   this.forceUpdate(); 
  }

  renderLojas = () => {
    if(this.state.list_lojas && this.state.list_lojas.length > 0){
      return this.state.list_lojas.map((loja, index) => {
        return(
          <tr key={index}>
            <th scope="row">{loja.id}</th>
            <td>{ loja.cod_filial }</td>
            <td>{ loja.descricao }</td>
            <td>{ loja.cep }</td>
            <td><button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateLoja" onClick={() => this.handleEdit(loja)}>Editar</button></td>
            <td><button  type="button" className="btn btn-danger" data-toggle="modal" data-target=".delete" onClick={() => this.handleDelete(loja)}>Deletar</button></td>
          </tr>
        );
      });
    }
  }
  renderProdutos = () => {
    if(this.state.list_produtos && this.state.list_produtos.length > 0){
      let retorno = '';
      return this.state.list_produtos.map((produto, index) => {
        if(this.state.produtos[index]){
          retorno = <option key={index} value={produto.id} selected='selected'>{produto.cod_produto} - {produto.descricao}</option>
        }else{
          retorno = <option key={index} value={produto.id}>{produto.cod_produto} - {produto.descricao}</option>
        }
        return (
            retorno
        );
      });
    }
  }

  createLoja = (event) => {
    event.preventDefault();
    let obj = {
      descricao: this.state.descricao,
      cod_filial: this.state.cod_filial,
      cep: this.state.cep
    }
    loja.createLoja(obj).then(response =>{
      if(this.state.produtos.length > 0){
        if(response.status === 201){
          obj = {
            id: response.data.id,
            ids: this.state.produtos
          }
          loja.associaProduto(obj).then(response => {
            Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
          })
          .catch(err => {
            event.preventDefault();
            Message.error('Erro', 'Não foi possivel Cadastrar seu produto verifique as informações!');
          });
        }
      }else{
        Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
      }
    })
    .catch(err => {
      event.preventDefault();
      Message.error('Erro', 'Não foi possivel Cadastrar seu produto verifique as informações!');
    });
  } 

  upLoja = (event) => {
    event.preventDefault();
    let obj = {
      id: this.state.id,
      descricao: this.state.descricao,
      cod_filial: this.state.cod_filial,
      cep: this.state.cep
    }
    loja.updateLoja(obj).then(response =>{
      if(this.state.produtos.length > 0){
        obj = {
          id: response.data.id,
          ids: this.state.produtos
        }
        loja.associaProduto(obj).then(response => {
          Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
        })
        .catch(err => {
          event.preventDefault();
          Message.error('Erro', 'Não foi possivel Cadastrar seu produto verifique as informações!');
        });
      }else{
        Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
      }
    })
    .catch(err => {
      event.preventDefault();
      Message.error('Erro', 'Não foi possivel Cadastrar seu produto verifique as informações!');
    });
  }
  delLoja = (event) =>{
    loja.deleteLoja(this.state.id).then(response => {
      Message.success('Sucesso', 'Produto deletado com sucesso!');
      window.location.reload();
    })
    .catch(err => {
      event.preventDefault();
      Message.error('Erro', 'Não foi possivel deletar este produto!');
    });
  }

  render() {
    return (
      <Container>
        <div className="container">
          <div className="card">
            <div className="card-header">
              Lojas
              <button  type="button" className="btn btn-success float-right" data-toggle="modal" data-target="#createLoja">Novo</button>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Filial</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">CEP</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderLojas()}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal fade" id="createLoja" tabIndex="-1" role="dialog" aria-labelledby="createLojaLabel" aria-hidden="true" data-backdrop="static">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="createLojaLabel">Criar Loja</h5>
                  <Link className="close" data-dismiss="modal" arial-label="Close" to="/loja">
                    <span aria-hidden="true">&times;</span>
                  </Link>
                </div>
                <form method="POST">
                  <div className="modal-body">
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="cod_filial">Cod. Filial</label>
                        <input type="text" className="form-control" onChange={this.handleInputChange} id="cod_filial" name="cod_filial"/>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="cep">Cep</label>
                        <input type="text" className="form-control" onChange={this.handleInputChange} id="cep" name="cep"/>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea className="form-control" onChange={this.handleInputChange} id="descricao" name="descricao" rows="3"></textarea>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="cep">Produtos</label>
                        <select multiple className="form-control" onChange={this.handleInputChange} id="produtos" name="produtos">
                          {this.renderProdutos()}
                        </select>
                        <small>Precione ctrl para marcar um produto, e para desmarcar apenas um.</small>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Link className="btn btn-secondary" data-dismiss="modal"to="/loja">
                      Cancelar
                    </Link>
                    <button className="btn btn-success float-right" onClick={this.createLoja}>Cadastrar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal fade" id="updateLoja" tabIndex="-1" role="dialog" aria-labelledby="updateLojaLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="updateLojaLabel">Criar Loja</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="cod_filial">Cod. Filial</label>
                        <input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.cod_filial} id="cod_filial" name="cod_filial"/>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="cep">Cep</label>
                        <input type="text" className="form-control" onChange={this.handleInputChange}  value={this.state.cep} id="cep" name="cep"/>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea className="form-control" onChange={this.handleInputChange}  value={this.state.descricao} id="descricao" name="descricao" rows="3"></textarea>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="cep">Produtos</label>
                        <select multiple={true} className="form-control" onChange={this.handleInputChange} value={this.state.produtos.id} id="produtos" name="produtos">
                          {this.renderProdutos()}
                        </select>
                        <small>Precione ctrl para marcar um produto, e para desmarcar apenas um.</small>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Link className="btn btn-secondary" data-dismiss="modal"to="/loja">
                      Cancelar
                    </Link>
                    <button className="btn btn-success float-right" onClick={this.upLoja}>Editar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal fade delete" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteLabel">Tem certeza que deseja Excluir ?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button className="btn btn-danger float-right" onClick={this.delLoja}>Deletar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    );
  }
}

export default Loja;
