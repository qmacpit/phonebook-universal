import React, { Component } from 'react';
import { connect } from 'react-redux';

import { contacts, contactDetails } from '../actions/actions';
import { findIndexById } from '../utils';

class Details extends Component {
  
  constructor(props) {
    super(props);    
  }

  componentDidMount() {
    const { dispatch } = this.props;    
    dispatch(contactDetails(this.getContactId()));    
  }

  getContactId() {
    return parseInt(this.props.params.contactId);

  }
  render() {    
    let index = findIndexById(this.getContactId(), this.props.contacts);
    let contact = this.props.contacts[index];
    return (
      <div>
        <h3>Details</h3>        
        {
          contact
          ? (
            <div>
              <div>id: <b>{contact.id}</b></div>
              <div>name: <b>{contact.name}</b></div>            
              <div>mobile: <b>{contact.mobile}</b></div>            
              <div>mail: <b>{contact.mail}</b></div>          
            </div>            
          )
          : ''
        }
        <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(Details)