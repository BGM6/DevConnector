import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}}) => {

	useEffect(() => {
		getCurrentProfile();
	}, []);
	return loading && profile === null ?
		<Spinner/> :
		<React.Fragment>
		<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"> Welcome {
					user ? user.name : null
					/*
					same as
					{user && user.name}
					 */
				}</i>
			</p>
			{profile !== null ?
				<React.Fragment>Has Profile</React.Fragment> :
				<React.Fragment>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</React.Fragment>}
		</React.Fragment>
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		profile: state.profile
	};
};

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);