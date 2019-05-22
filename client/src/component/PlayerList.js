import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getPlayerQuery} from '../quries/queries';

//components
import PlayerDetails from './PlayerDetails';

class PlayerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }    
    displayPlayers(){
        let data= this.props.data;
        if(data.loading){
            return (<div>Loading data.....</div> )
        } else{
            return data.players.map(player => {
                return (
                    <li key={player.id} onClick= {e => { this.setState({ selected: player.id })}}> {player.name} </li>
                )
            })
        }
    }
    render(){
    return (
        <div>
            <ul id="player-list">
                { this.displayPlayers()}
            </ul>
            <PlayerDetails playerid={this.state.selected} />
        </div>
    );
    }
}

export default graphql(getPlayerQuery)(PlayerList);
