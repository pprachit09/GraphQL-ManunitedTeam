const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID
} = graphql;

const teams = [
    {id: '1', name: 'David De Gea', position:'GK', nation:'Spain', jersynumber:'1'},
    {id: '2', name: 'Juan Mata', position:'CM', nation:'Spain', jersynumber:'8'},
    {id: '3', name: 'Paul Pogba', position:'CM', nation:'France', jersynumber:'6'}
]

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        nation: {type: GraphQLString},
        jersynumber: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        team: {
            type: TeamType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //to get the data from database
                return _.find(teams, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
