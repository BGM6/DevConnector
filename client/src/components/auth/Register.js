import React, {Fragment, useState} from 'react';
import axios from 'axios';

const Register = () => {
	const [formData, setFormData] = useState({
		userName: '',
		email: '',
		password: '',
		password2: '',
	});

	const {userName, email, password, password2} = formData;

	const onInputChange = e => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onFormSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Password do not match');
		} else {
			const newUser = {
				name: userName,
				email,
				password,
			};
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};
				const body = JSON.stringify(newUser);
				const res = await axios.post('/api/users', body, config);
				console.log(res.data);
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};


	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead"><i className="fas fa-user"/> Create Your Account</p>

			<form className="form" onSubmit={onFormSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="userName"
						value={userName}
						onChange={onInputChange}
						required/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onInputChange}
						required
					/>
					<small className="form-text"
					>This site uses Gravatar so if you want a profile image, use a
						Gravatar email</small
					>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={onInputChange}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register"/>
			</form>

			<p className="my-1">
				Already have an account? <a href="login.html">Sign In</a>
			</p>
		</Fragment>
	);
};

export default Register;