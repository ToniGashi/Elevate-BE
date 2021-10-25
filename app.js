const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());
const port = process.env.PORT || 4000;

app.use('/users', require('./routes/users'))
app.use('/startups', require('./routes/startups'))

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
