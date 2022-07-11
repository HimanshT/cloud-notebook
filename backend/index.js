const express = require('express')
const app = express()
const connectToMongo = require('./db');
const port = 3000
connectToMongo();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log('server connected');
})

