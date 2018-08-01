import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './login/Login';
import Loja from './lojas/Loja';
import Produto from './produtos/Produto';

// const PrivateRoute = ({ component: Component, ...rest  }) => (  
//   <Route {...rest} render={(props) => (
//     Auth.isAuthenticated === true ? <Component {...props}/> : <Redirect to='/login' />
//   )} />
// )

const Rotas = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/loja" component={Loja}/>
      <Route path="/produto" component={Produto}/>
    </Switch>
  </Router>
);

export default Rotas;
