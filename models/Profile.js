const {Schema, model} = require('mongoose');

const ProfileSchema = new Schema({
	// Connects this user from the user model
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	company: {
		type: String
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	status: {
		type: String,
		require: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	bio: {
		type: String,
	},
	githubusername: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldofstudy: {
				type: String,
				required: true,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			}
		}
	],
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Profile = model('profile', ProfileSchema);

module.exports = Profile;