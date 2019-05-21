const express = require('express');
const app = express();

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');
const key = require('./key/keys');

//connect to mongodb
mongoose.connect(`mongodb+srv://Prachit:${key.mongo.pass}@cluster0-fp8zw.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connection Done..Now make Fireworks...!!!');
})

//route the traffic to graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(6200, () => {
    console.log('running on http://localhost:6200')
})