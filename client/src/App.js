import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import PlayerList from './component/PlayerList';
import AddPlayer from './component/AddPlayer';

//setting up endpoint url for Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:6200/graphql'
})

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> Man united Team</h1>
          <PlayerList />
          <AddPlayer />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
