import React, { Component } from 'react';
import ProdutoRequest from '../requests/produtoRequest';
import Message from '../services/Message';
import Container from '../components/Container';

const produto = new ProdutoRequest();

class Produto extends Component {
  constructor(props){
    super(props);
    this.state = {
      list_produtos: [],
      id: '',
      cod_produto: '',
      descricao: '',
      valor_venda: ''
    }
  }
  
	handleInputChange = (event) =>{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
				[name]: value
		});
	}
  handleEdit = (produto) => {
     this.setState({
       id: produto.id,
       cod_produto: produto.cod_produto,
       descricao: produto.descricao,
       valor_venda: produto.valor_venda
     });
  }
  handleDelete = (produto) => {
    console.log(produto);
     this.setState({
       id: produto.id,
       cod_produto: produto.cod_produto,
       descricao: produto.descricao,
       valor_venda: produto.valor_venda
     });
  }
  createProduto = (event) => {
    let obj = {
      cod_produto: this.state.cod_produto,
      descricao: this.state.descricao,
      valor_venda: this.state.valor_venda
    }

    produto.createProduto(obj).then(response =>{
      Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
    })
    .catch(err => {
      event.preventDefault();
      Message.error('Erro', 'Não foi possivel Cadastrar seu produto verifique as informações!');
    });
  } 

  upProduto = (event) => {
    event.preventDefault();
    let obj = {
      id: this.state.id,
      cod_produto: this.state.cod_produto,
      descricao: this.state.descricao,
      valor_venda: this.state.valor_venda
    }
    produto.updateProduto(obj).then(response =>{
      Message.success('Sucesso', 'Cadastro de produto realizado com sucesso!');
    })
    .catch(err => {
      event.preventDefault();
      Message.error('Erro', 'Não foi possivel Atualizar seu produto verifique as informações!');
    });
  }

  delProduto = (event) =>{
    produto.deleteProduto(this.state.id).then(response => {
      Message.success('Sucesso', 'Produto deletado com sucesso!');
      window.location.reload();
    })
    .catch(err => {
      Message.error('Erro', 'Não foi possivel deletar este produto!');
    });
  }

 

  async componentWillMount(){
    await produto.getProdutos().then(response =>{
      if(response.status === 200){
        this.setState({ list_produtos: response.data });
      }
    })
    .catch(err =>{
      Message.error('Erro', 'Tivemos um problema para buscar os produtos!');
    });
   this.forceUpdate(); 
  }

  renderProdutos = () => {
    if(this.state.list_produtos && this.state.list_produtos.length > 0){
      return this.state.list_produtos.map((produto, index) => {
        return(
          <tr key={index}>
            <th scope="row">{produto.id}</th>
            <td>{ produto.cod_produto }</td>
            <td>{ produto.descricao }</td>
            <td>{ produto.valor_venda }</td>
            <td><button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#editProduto" onClick={() => this.handleEdit(produto)}>Editar</button></td>
            <td><button  type="button" className="btn btn-danger" data-toggle="modal" data-target=".delete" onClick={() => this.handleDelete(produto)}>Deletar</button></td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
				<Container>
					<div className="container">
						<div className="card">
							<div className="card-header">
								Produtos
								<button  type="button" className="btn btn-success float-right" data-toggle="modal" data-target="#create">Novo</button>
							</div>
							<div className="card-body">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Cod. Produto</th>
											<th scope="col">Descrição</th>
											<th scope="col">Valor de venda</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{this.renderProdutos()}
									</tbody>
								</table>
							</div>
						</div>

						<div className="modal fade" id="editProduto" tabIndex="-1" role="dialog" aria-labelledby="editProdutoLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="editProdutoLabel">Modal title</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
                    <form>
                      <div className="modal-body">
                        <div className="row">
                          <div className="form-group col-12">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea className="form-control" onChange={this.handleInputChange} value={this.state.descricao} id="descricao" name="descricao" rows="3"></textarea>
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="cod_produto">Cod. Produto</label>
                            <input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.cod_produto} id="cod_produto" name="cod_produto"/>
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="valor_venda">Valor de venda</label>
                            <input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.valor_venda} id="valor_venda" name="valor_venda" placeholder="1000.90"/>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button className="btn btn-success float-right" onClick={this.upProduto}>Alterar</button>
                      </div>
                    </form>
								</div>
							</div>
						</div>

						<div className="modal fade" id="create" tabIndex="-1" role="dialog" aria-labelledby="createLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="createLabel">Modal title</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<form>
										<div className="modal-body">
											<div className="row">
												<div className="form-group col-12">
													<label htmlFor="descricao">Descrição</label>
													<textarea className="form-control" onChange={this.handleInputChange} value={this.state.descricao} id="descricao" name="descricao" rows="3"></textarea>
												</div>
												<div className="form-group col-12">
													<label htmlFor="cod_produto">Cod. Produto</label>
													<input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.cod_produto} id="cod_produto" name="cod_produto"/>
												</div>
												<div className="form-group col-12">
													<label htmlFor="valor_venda">Valor de venda</label>
													<input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.valor_venda} id="valor_venda" name="valor_venda" placeholder="1000.90"/>
												</div>
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
											<button className="btn btn-success float-right" onClick={this.createProduto}>Cadastrar</button>
										</div>
									</form>
								</div>
							</div>
						</div>

            <div className="modal fade delete" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
										<h5 className="modal-title" id="createLabel">Tem certeza que deseja Excluir ?</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
                  <div className="modal-body">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
											<button className="btn btn-danger float-right" onClick={this.delProduto}>Deletar</button>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</Container>
    );
  }
}

export default Produto;
