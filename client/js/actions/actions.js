import { getContacts, getContactDetails, createContact } from '../services/dataService';
import { findIndexById } from '../utils';

export const ACTIONS = {
  CONTACTS_REQUEST: 'contacts_req',
  CONTACTS_RESPONSE: 'contacts_res',
  CONTACT_DETAILS_RESPONSE: 'contact_details_res',
  CONTACT_CREATE_RESPONSE: 'contact_create_res'
};

function contactsRequest() {
  return {
    type: ACTIONS.CONTACTS_REQUEST,
    contacts: []
  }
}

function contactsResponse(contacts) {
  return {
    type: ACTIONS.CONTACTS_RESPONSE,
    contacts
  }
}

function addConcactResponse(id, contact) {
  return {
    type: ACTIONS.CONTACT_CREATE_RESPONSE,
    id, 
    contact
  };
}

function contactDetailsResponse(id, details) {
  return {
    type: ACTIONS.CONTACT_DETAILS_RESPONSE,
    id,
    details
  }
}

function performGetContacts() {
  return dispatch => {
    dispatch(contactsRequest())
    return getContacts()    
    .then(contacts => dispatch(contactsResponse(contacts)));
  }  
}

function performGetContactDetails(id) {
  return dispatch => {    
    return getContactDetails(id)    
    .then(details => dispatch(contactDetailsResponse(id, details)));
  }  
}

export function contacts() {
  return (dispatch, getState) => {
    let state = getState();
    if (!state.contacts || !state.contacts.length)
      return dispatch(performGetContacts());    
  }  
}

export function contactDetails(id) {
  return (dispatch, getState) => {
    let state = getState();    
    let index = findIndexById(id, state.contacts);
    if (index === -1)
      return console.log('getContactDetails: invalid index');
    let details = state.contacts[index].details;
    if (!details)
      return dispatch(performGetContactDetails(id));    
  }  
}

export function newContact(contact) {
  return (dispatch, getState) => {    
    return createContact(contact)
    .then(id => dispatch(addConcactResponse(id, contact)));    
  }  
}