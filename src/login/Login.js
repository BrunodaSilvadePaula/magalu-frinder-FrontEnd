import React, { Component } from 'react';
import './Login.css';
import logo from '../magalu.gif';
import LoginRequest from '../requests/loginRequest';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  doLogin = (event) => {
    event.preventDefault();
    const login = new LoginRequest();
    login.doLogin(this.state).then(response =>{
      if(response.status === 200){
        sessionStorage.setItem('token', response.data.token);
        this.props.history.push('/loja');
      }
    })
    .catch(err =>{
      console.log('error', err);
    })
  }

	handleInputChange = (event) =>{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
				[name]: value
		});
	}
  render() {
    return (
      <div className="text-center">
        <form className="form-signin">
					<img src={logo} alt="logo" />
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>
          <label htmlFor="inputUser" className="sr-only">Usuario</label>
          <input type="text" onChange={this.handleInputChange} id="inputUser" className="form-control" name="username" placeholder="Usuario" required=""/>
          <label htmlFor="inputPassword" className="sr-only">Senha</label>
          <input type="password" onChange={this.handleInputChange} id="inputPassword" className="form-control" name="password" placeholder="Senha" required=""/>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.doLogin}>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
