import React from 'react';
import logo from '../../magalu.gif';
// import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

class Container extends React.Component {
  render(){
    return (
      <div className="container">
      	<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="#"><img src={logo} alt="logo" /></Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/loja">Loja</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/produto">Produto</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/usuario">Usuario</Link>
							</li>
						</ul>
					</div>
				</nav> 
        {this.props.children}
      </div>
    );
  } 
}

export default Container;
