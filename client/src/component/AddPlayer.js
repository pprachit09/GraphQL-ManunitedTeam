import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getNationQuery, getPlayerQuery, addPlayerMutation} from '../quries/queries'

class AddPlayer extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            jersynumber:"",
            postion:"",
            nationId:""
        }
    }
    //To display nations from nation collection
    displayNations(){
        let data = this.props.getNationQuery;
        if(data.loading){
            return (<option disabled>Loading Nations</option>)
        } else{
            return data.nations.map( nation => {
                return (<option key={nation.id} value={nation.id}>{nation.name}</option>)
            })
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addPlayerMutation({
            variables:{
                name: this.state.name,
                position: this.state.postion,
                jersynumber: Number(this.state.jersynumber),
                nationId: this.state.nationId
            },
            refetchQueries: [{ query: getPlayerQuery }]
        })
    }
    render(){
        return (
        <form id="player-form" onSubmit={this.submitForm.bind(this)}>
            
            <div className="field">
                <label>Player name</label>
                <input type="text" onChange={e => this.setState({ name: e.target.value })}></input>
            </div>

            <div className="field">
                <label>Postion</label>
                <input type="text" onChange={e => this.setState({ postion: e.target.value })}></input>
            </div>

            <div className="field">
                <label>Jersynumber</label>
                <input type="text" onChange={e => this.setState({ jersynumber: e.target.value })}></input>
            </div>

            <div className="field">
                <label>Nation</label>
                <select onChange={e => this.setState({ nationId: e.target.value })}>
                    <option>Select Nation</option>
                    {this.displayNations()}
                </select>
            </div>

            <button>+</button>
        </form>
        );
    }
}

  export default compose(
      graphql(getNationQuery, {name: "getNationQuery"} ),
      graphql(addPlayerMutation, {name: "addPlayerMutation"}) 
  )(AddPlayer);