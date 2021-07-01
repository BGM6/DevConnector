import React from 'react';
import {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../App.css';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar/>
				<Route exact path="/" component={Landing}/>
				<section className="container">
					<Switch>
						<Route excat path="/register" component={Register}/>
						<Route excat path="/Login" component={Login}/>
					</Switch>
				</section>
			</Fragment>
		</Router>
	);
};

export default App;