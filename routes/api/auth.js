const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

//@route GET api/auth
//@desc  Authenticate user and get token
//@access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/',
	check('email', 'Please include a valid email')
		.isEmail(),
	check('password', 'Password is required')
		.exists()
	, async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({errors: errors.array()});
		}

		const {email, password} = req.body;
		try {
			//See if user exist
			let user = await User.findOne({email});
			if (!user) {
				return res
					.status(400)
					.json({errors: [{msg: 'Invalid Credentials'}]});
			}

			//Match token with user
			const isMatch = await bcrypt.compare(password, user.password);
			if(!isMatch) {
				return res
					.status(400)
					.json({errors: [{msg: 'Invalid Credentials'}]})
			}

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user._id,
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{expiresIn: 36000000}, (err, token) => {
					if (err) throw err;
					//Can send the token or user._id
					res.json({token});
				});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	});

module.exports = router;

