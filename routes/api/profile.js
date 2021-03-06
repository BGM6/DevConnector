const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route POST api/profile
//@desc  Create or update user profile
//@access Private

router.post('/', auth,
	check('status', 'Status is required')
		.not()
		.isEmpty(),
	check('skills', 'Skills is required')
		.not()
		.isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;

		const standardFields = [
			'company',
			'website',
			'bio',
			'status',
			'githubusername',
			'skills'
		];
		const socialFields = [
			'youtube',
			'twitter',
			'facebook',
			'linkedin',
			'instagram'
		];

		standardFields.forEach(field => {
			if (req.body[field]) profileFields[field] = req.body[field];
		});

		//Build social object
		profileFields.social = {};
		socialFields.forEach(field => {
			if (req.body[field]) profileFields.social[field] = req.body[field];
		});
		console.log();
		//Turns the skills into an array to separate by commas
		req.body.skills = req.body.skills.split(',')
			.map(skill => skill.trim());

		try {
			let profile = await Profile.findOne({user: req.user.id});

			if (profile) {
				//Update Profile
				profile = await Profile.findOneAndUpdate(
					{user: req.user.id},
					{$set: profileFields},
					{new: true}
				);
				return res.json(profile);
			}
			//Create Profile

			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('SERVER ERROR');
		}
	});

//@route POST api/profile
//@desc  Get all profiles
//@access Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('SERVER ERROR');
	}
});

//@route GET api/profile/user/:user_id
//@desc  Get profile by userId
//@access Public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({msg: 'Profile not found'});
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({msg: 'Profile not found'});
		}
		res.status(500).send('SERVER ERROR');
	}
});

//@route DELETE api/profile/user/:user_id
//@desc  Delete profile, user & posts
//@access Private

router.delete('/', auth, async (req, res) => {
	try {
		//Remove users posts
		//Remove Profile
		await Profile.findOneAndRemove({user: req.user.id});
		//Remove User
		await User.findOneAndRemove({_id: req.user.id});
		res.json({msg: 'User deleted'});
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({msg: 'Profile not found'});
		}
		res.status(500).send('SERVER ERROR');
	}
});

//@route PUT api/profile/experience
//@desc  Add profile experience
//@access Private

router.put('/experience', auth,
	check('title', 'Title is required')
		.not()
		.isEmpty(),
	check('company', 'Company is required')
		.not()
		.isEmpty(),
	check('from', 'From date is required')
		.not()
		.isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const {title, company, location, from, to, current, description} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		};
		try {
			const profile = await Profile.findOne({user: req.user.id});
			profile.experience.unshift(newExp);

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('SERVER ERROR');
		}
	});

//@route DELETE api/profile/experience/:exp_id
//@desc  Delete experience from profile
//@access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({user: req.user.id});
		//Ger remove index
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);

	} catch (err) {
		console.error(err.message);
		return res.status(500).send('SERVER ERROR');
	}
});

//@route PUT api/profile/education
//@desc  Add profile education
//@access Private

router.put('/education', auth,
	check('school', 'School is required')
		.not()
		.isEmpty(),
	check('degree', 'Degree is required')
		.not()
		.isEmpty(),
	check('fieldofstudy', 'Field of Study is required')
		.not()
		.isEmpty(),
	check('from', 'From date is required')
		.not()
		.isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const {school, degree, fieldofstudy, from, to, current, description} = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};
		try {
			const profile = await Profile.findOne({user: req.user.id});
			profile.education.unshift(newEdu);

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('SERVER ERROR');
		}
	});

//@route DELETE api/profile/education/:edu
//@desc  Delete education from profile
//@access Private

router.delete('/education/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({user: req.user.id});
		//Ger remove index
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);

	} catch (err) {
		console.error(err.message);
		return res.status(500).send('SERVER ERROR');
	}
});

//@route GET api/profile/github/:username
//@desc  GET user repos from Github
//@access Public

router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${config.get('OAUTH-TOKEN')}`
			}
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);

			if (response.statusCode !== 200) {
				return res.status(404).json({msg: 'No Github profile found'});
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('SERVER ERROR');
	}
});

module.exports = router;