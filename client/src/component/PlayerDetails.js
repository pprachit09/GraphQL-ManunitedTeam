import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getPlayerDetailQuery} from '../quries/queries'

class PlayerDetails extends Component {
    displayPlayerDetails(){
        const {player} = this.props.data
        if(player){
            return(
                <div>
                    <h2>{player.name}</h2>
                    <p>{player.position}</p>
                    <p>{player.jersynumber}</p>
                    <p>All players from similar country</p>
                    <ul className="other=players">
                        {player.nation.players.map(item => {
                            return <li key={item.id}> {item.name} </li>
                        })}
                    </ul>
                </div>
            )
        } else{
            return(
                <div>
                    No Player selected
                </div>
            )
        }
    }
    render(){

        return (
            <div id="player-details">
                {this.displayPlayerDetails()}
            </div>
      );
    }
  }
  
export default graphql(getPlayerDetailQuery,{
    options: (props) => {
        return{
            variables: {
                id: props.playerid
            }
        }
    }
})(PlayerDetails);