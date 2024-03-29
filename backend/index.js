const express = require('express')
const app = express()
const cors = require('cors');
const connectToMongo = require('./db');
const port = 5000
connectToMongo();

app.use(express.json());
app.use(cors())


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log('server connected');
})

