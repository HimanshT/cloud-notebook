const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/notebook';

const connectToMongo = () => {
    mongoose.connect(uri, () => {
        console.log('mongodb connected');
    })
}



module.exports = connectToMongo;