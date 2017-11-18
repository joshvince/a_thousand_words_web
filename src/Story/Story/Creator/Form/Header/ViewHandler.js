import React, { Component } from 'react';
import HeaderForm from './Form.js';
import HeaderView from './View.js';

class HeaderViewHandler extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: true,
      data: {
        title: "",
        subtitle: ""
      }
    }
  }
  updateData = (newData) => {
    this.setState({
      data: newData,
      editing: false
    })
  }
  toggleEdit = () => {
    this.setState({editing: true})
  }
  render() {
    const displayForm = this.state.editing;
    return (
      <div>
        {displayForm ? 
          <HeaderForm 
            title={this.state.data.title} 
            subtitle={this.state.data.subtitle}
            submitHandler={this.updateData} 
          /> :
          <HeaderView 
            title={this.state.data.title} 
            subtitle={this.state.data.subtitle}
            submitHandler={this.toggleEdit}
          />}
      </div>
    );
  }
}

export default HeaderViewHandler;