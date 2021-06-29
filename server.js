const express = require('express');
const connectDB = require('./config/db')
//process.env.PORT is for heroku that is what it is listening too
const PORT = process.env.PORT || 5000;
const app = express();

//Init Middleware;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//Connect Database
connectDB().then(r => r)
app.get('/', (req, res) => {
	res.send('Working');
});

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))

app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT: ${PORT}`));