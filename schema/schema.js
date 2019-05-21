const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
} = graphql;

const players = [
    {id: '1', name: 'David De Gea', position:'GK', jersynumber:1, nationId: '1'},
    {id: '2', name: 'Juan Mata', position:'CM', jersynumber:8, nationId: '1'},
    {id: '3', name: 'Paul Pogba', position:'CM', jersynumber:6, nationId: '2'},
    {id: '4', name: 'Antony Martial', position:'LW', jersynumber:11, nationId: '2'},
    {id: '5', name: 'Marcus Rashford', position:'ST', jersynumber:10, nationId: '3'},
    {id: '6', name: 'Jesse Lingard', position:'CM', jersynumber:14, nationId: '3'}
]

const nations = [
    {id: '1', name: 'Spain'},
    {id: '2', name: 'France'},
    {id: '3', name: 'England'}
]

//graphql schema for team
const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        jersynumber: {type: GraphQLInt},
        nation: {
            type: NationType,
            resolve(parent, args){
            //while querying parent will have the whole Player object
            //From the Player object get the nationId and check in nations collction
                return _.find(nations, { id: parent.nationId })
            }
        }
    })
});

//graphql schema for nation
const NationType = new GraphQLObjectType({
    name: 'Nation',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        players: { 
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                //parent property will have nation object
                //from the nation object get the id and check for the similar nationId in players collection
                return _.filter(players, { nationId: parent.id });
            } 
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //to get the data from database
                return _.find(players, { id: args.id });
            }
        },
        nation: {
            type: NationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //to get the data from database
                return _.find(nations, { id: args.id })
            }
        },
        //to get all the players
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                //return all the players
                return players
            }
        },
        //to get all nations details
        nations: {
            type: new GraphQLList(NationType),
            resolve(parent, args){
                //return all the nations
                return nations
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
