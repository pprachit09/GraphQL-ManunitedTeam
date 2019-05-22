import {gql} from 'apollo-boost';


const getNationQuery = gql`
  {
    nations{
      name
      id
    }
  }`


const getPlayerQuery = gql`
  {
    players{
      name
      id
    }
  }
`
const addPlayerMutation = gql`
  mutation AddPlayer($name: String!, $position: String!, $jersynumber: Int!, $nationId: ID!){
      addPlayer(name: $name, jersynumber: $jersynumber, position: $position, nationId: $nationId ){
          name
          id
      }
  }
`

const getPlayerDetailQuery = gql`
  query($id: ID){
      player(id: $id){
        id
        name
        position
        jersynumber
        nation{
           id
           name
           players{
               name
               id
           } 
        }
      }
  }
`

export {getNationQuery, getPlayerQuery, addPlayerMutation, getPlayerDetailQuery};