import '../App.css';
import React from 'react';
import {Fragment} from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';

const App = () => {
	return (
			<BrowserRouter>
				<Fragment>
					<Navbar/>
					<Route exact path="/" component={Landing}/>
					<section className="container">
						<Alert/>
						<Switch>
							<Route excat path="/register" component={Register}/>
							<Route excat path="/login" component={Login}/>
						</Switch>
					</section>
				</Fragment>
			</BrowserRouter>
	);
};

export default App;