import React, { Component } from 'react'
import Menu from './Menu'

export default class Ccomponent extends Component {
constructor(props) {
  super(props)

  this.state = {
     visibility: false
  };

  this.handleClick = this.handleClick.bind(this);
}
handleClick(){
    this.setState(state => ({
        visibility: !state.visibility
    }));
}


  render() {
    if (this.state.visibility){
    return (
      <div>
        <Menu/>
        <h1>now u see me</h1>
        <button onClick={this.handleClick}>Click</button>
      </div>
      );
    }
    else {
        return (
        <div>
          <Menu/>
          <button onClick={this.handleClick}>Click</button>
        </div>
      );
    }
 }
}
  