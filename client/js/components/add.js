import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newContact } from '../actions/actions';

class Add extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    }
  }

  goBack(){
    this.context.router.goBack();
  }

  bindOnChangeHandler(param) {
    let me = this;
    return function(e) {
      e.stopPropagation();
      let { value } = e.target;
      let { contact } = me.state;
      contact[param] = value;
      me.setState({ contact });
    }
  }

  onSubmit(e) {
    let me = this;
    e.preventDefault();    
    let { dispatch } = this.props;
    dispatch(newContact(this.state.contact))
    .then(() => {
      me.goBack();
    });
  }

  render() {
    return (
      <div>
        <h5>Add new contact</h5>        
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <div>name</div>
            <input type="text" className="u-full-width" onChange={this.bindOnChangeHandler('name')}/>
          </div>
          <div>
            <div>mobile</div>
            <input type="text" className="u-full-width" onChange={this.bindOnChangeHandler('mobile')}/>
          </div>
          <div>
            <div>email</div>
            <input type="text" className="u-full-width" onChange={this.bindOnChangeHandler('mail')}/>          
          </div>
          <input className="button-primary" type="submit" value="Submit" />            
        </form>        
      </div>
    );
  }
}

Add.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(Add)