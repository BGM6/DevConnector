import '../App.css';
import React, {useEffect} from 'react';
import {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import CreateProfile from './profile-forms/CreateProfile';
import Login from './auth/Login';
import Alert from './layout/Alert';
import {loadUser} from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {

	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

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
						<PrivateRoute excat path="/dashboard" component={Dashboard}/>
						<PrivateRoute excat path="/create-profile" component={CreateProfile}/>
					</Switch>
				</section>
			</Fragment>
		</BrowserRouter>
	);
};

export default App;