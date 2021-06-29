const express = require('express');

const app = express();
//process.env.PORT is for heroku that is what it is listening too
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Working');
});

app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT: ${PORT}`));