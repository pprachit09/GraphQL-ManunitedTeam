const express = require('express');
const app = express();

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

//route the traffic to graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(6200, () => {
    console.log('running on http://localhost:6200')
})