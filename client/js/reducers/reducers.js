import { combineReducers } from 'redux';
import { ACTIONS } from '../actions/actions'
import { findIndexById } from '../utils';

function contacts(state = {}, action) {  
  let _contacts;
  switch (action.type) {

    case ACTIONS.CONTACTS_REQUEST:
      return [];

    case ACTIONS.CONTACTS_RESPONSE:
      return action.contacts;      

    case ACTIONS.CONTACT_DETAILS_RESPONSE:    
      _contacts = state.slice(0);
      let { id, details } = action;
      let index = findIndexById(id, _contacts);      
      if (index === -1) {        
        return console.log('contacts: invaliIndex')
      }         
      _contacts[index].mobile = details.mobile;
      _contacts[index].mail = details.mail;
      return _contacts;

    case ACTIONS.CONTACT_CREATE_RESPONSE:
      let { contact } = action;
      contact.id = action.id;
      _contacts = state.slice(0);
      _contacts.push(contact);
      return _contacts;

    default:
      return state
  }  
}

const contactsReducer = combineReducers({
  contacts
})

export default contactsReducer
