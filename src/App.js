import React, { Component } from 'react';
import LojaRequest from './requests/lojaRequest';
import logo from './magalu.gif';
import spiner from './spinner-solid.svg';
import Message from './services/Message';
import './App.css';

const loja = new LojaRequest();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cep: '',
      produto: '',
      list_results: [],
      spiner: false
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
  buscaProdutos = async (event) => {
    event.preventDefault();
    this.setState({ spiner: true });
    await loja.busca_produtos(this.state.cep, this.state.produto).then(response => {
      if(response.status === 204){
        Message.info('Retorno', 'Não encontramos um produto com seus parametros de busca!');
      }else{
        this.setState({ list_results: response.data.retorno });
      }
      this.setState({ spiner: false });
    })
    .catch(err => {
      this.setState({ spiner: false });
      Message.error('Problemas com o Cep', 'Não conseguimos encontrar o seu cep na api, faça um novo teste com outro cep!');
    });
  }

  renderNav = () => {
    if(this.state.list_results && this.state.list_results.length > 0){
      let retorno = '';
      let id = '';
      let href = '';
      return this.state.list_results.map((resultado, index) => {
        id = 'nav' + resultado.filial + '-tab';
        href = '#div-' + resultado.filial + '-div';
        if(index === 0){
          retorno = <a key={index} className="nav-link col-12 active" id={id} data-toggle="pill" href={href} role="tab" arial-controls={href}>{resultado.filial} - {resultado.descricao}</a>
        }else{
          retorno = <a key={index} className="nav-link col-12" id={id} data-toggle="pill" href={href} role="tab" arial-controls={href}>{resultado.filial} - {resultado.descricao}</a>
        }
        return(
          retorno 
        );
      });
    }
  }
  renderDiv = () => {
    if(this.state.list_results && this.state.list_results.length > 0){
      let retorno = '';
      let id = '';
      let ul = '';
      return this.state.list_results.map((resultado, index) => {
        id = 'div-' + resultado.filial + '-div';
        ul = <ul className="col-3"><li><b>Cep da loja</b> <ul><li>{resultado.cep}</li></ul></li><li><b>Valor do produto</b> <ul><li>{resultado.vlr_produto}</li></ul></li><li><b>Distancia da loja</b> <ul><li>{resultado.distancia}</li></ul></li></ul>;
        if(index === 0){
          retorno = <div key={index} className="tab-pane fade show active" id={id} role="tabpanel" aria-labelledby={id}>{ul}</div>
        }else{
          retorno = <div key={index} className="tab-pane fade" id={id} role="tabpanel" aria-labelledby={id}>{ul}</div>
        }
        return(
          retorno 
        );
      });
    }
  }
  render() {
    if(this.state.spiner === true){
    return(
      <div className="App">
        <img src={spiner} className="spiner" alt="carregando..." />
      </div>
    );
    }else{
      return(
        <div className="App">
            <header className="App-header">
            <img src={logo} alt="logo" />
            <h1 className="App-title">Bem vindo ao Magalu Finder</h1>
            <h6>Para encontrar a loja mais próxima que contém o seu produto,</h6>
            <h6>entre com o nome ou código do produto, e seu cep</h6>
          </header>
          <div className="container">
            <form className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">Email</label>
                <input type="text" className="form-control" onChange={this.handleInputChange} id="produto" name="produto" placeholder="Código, Nome"/>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="cep" className="sr-only">Password</label>
                <input type="text" className="form-control" onChange={this.handleInputChange} id="cep" name="cep" placeholder="CEP: 14406269"/>
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={this.buscaProdutos}>Buscar</button>
            </form>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {this.renderNav()}
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="tab-content" id="v-pills-tabContent">
                  {this.renderDiv()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
