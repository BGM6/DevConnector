import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
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
			console.log('success');
	};


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
			Don't have an account?  <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};

export default Login;