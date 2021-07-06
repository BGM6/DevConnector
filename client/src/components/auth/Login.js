import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const {email, password} = formData;
	const onInputChange = e => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onFormSubmit = async e => {
		e.preventDefault();
		login(email, password)
	};

//Redirect if logged in
	if(isAuthenticated) {
		return <Redirect to="/dashboard"/>
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead"><i className="fas fa-user"/> Sign into your account</p>

			<form className="form" onSubmit={onFormSubmit}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						minLength="6"
						onChange={onInputChange}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login"/>
			</form>

			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps, {login})(Login);