import React, { Component } from 'react';
import UsuarioRequest from '../requests/usuarioRequest';
import Message from '../services/Message';
import Container from '../components/Container';

const usuario = new UsuarioRequest();

class Usuario extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: '',
      username: '',
      password: '',
      list_user: []
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
  handleDelete = (usuario) => {
     this.setState({
       id: usuario.id,
     });
  }
  async componentWillMount(){
    await usuario.getUsuarios().then(response =>{
      if(response.status === 200){
        this.setState({ list_user: response.data });
      }
    })
    .catch(err =>{
      Message.error('Erro', 'Tivemos um problema para carregar as lojas!');
    });
   this.forceUpdate(); 
  }
  renderUsuarios = () => {
    if(this.state.list_user && this.state.list_user.length > 0){
      return this.state.list_user.map((usuario, index) => {
        return(
          <tr key={index}>
            <th scope="row">{usuario.id}</th>
            <td>{usuario.username}</td>
            <td><button  type="button" className="btn btn-danger" data-toggle="modal" data-target=".delete" onClick={() => this.handleDelete(usuario)}>Deletar</button></td>
          </tr>
        )
      });
    }
  }
  createUsuario = (event) => {
    event.preventDefault();
    let obj ={
      username: this.state.username,
      password: this.state.password,
    }
    usuario.createUsuario(obj).then(response => {
      if(response.status === 200){
        usuario.getUsuarios().then(response =>{
          if(response.status === 200){
            this.setState({ list_user: response.data });
          }
        });
      }
      Message.success('Sucesso', 'Usuario cadastrado com sucesso!');
    })
    .catch(err => {
      console.log(err);
      Message.error('Erro', 'Não foi possivel Cadastrar este usuario verifique as informações!');
    })
  }
  delUsuario = (event) =>{
    usuario.deleteUsuario(this.state.id).then(response => {
      Message.success('Sucesso', 'Usuario deletado com sucesso!');
      window.location.reload();
    })
    .catch(err => {
      Message.error('Erro', 'Não foi possivel deletar este usuario!');
    });
  }
  render() {
    return(
      <Container>
        <div className="container">
          <div className="card">
            <div className="card-header">
              Usuarios
              <button  type="button" className="btn btn-success float-right" data-toggle="modal" data-target="#create">Novo</button>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderUsuarios()}
                </tbody>
              </table>
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
              <form method="POST">
                <div className="modal-body">
                  <div className="row">
                    <div className="form-group col-12">
                      <label htmlFor="username">Usuario</label>
                      <input type="text" className="form-control" onChange={this.handleInputChange} value={this.state.username} id="username" name="username"/>
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="password">Senha</label>
                      <input type="password" className="form-control" onChange={this.handleInputChange} value={this.state.password} id="password" name="password"/>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button className="btn btn-success float-right" onClick={this.createUsuario}>Cadastrar</button>
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
                  <button className="btn btn-danger float-right" onClick={this.delUsuario}>Deletar</button>
              </div>
            </div>
          </div>
        </div>

      </Container>
    );
  }
}

export default Usuario;
