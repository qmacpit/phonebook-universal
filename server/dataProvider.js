import { findIndexById } from '../client/js/utils';

let contacts = [
  {
    id: 1,
    name: 'John Doe',
    mobile: '+44094375435',
    mail: 'johndoe@mail.com'
  },
  {
    id: 2,
    name: 'David Williams',
    mobile: '+440943454677',
    mail: 'davidwilliams@mail.com'
  }
];

module.exports = {
  
  getContacts() {
    let data = [];
    let current;
    for (current of contacts) {
      let { id, name } = current;
      data.push({ id, name });
    }
    return data;
  },

  getDetails(id) {
    let { mobile, mail } = contacts[findIndexById(id, contacts)];
    return { mobile, mail };
  },

  createContact(data) {
    let { name, mobile, mail } = data;
    let id = contacts.length + 1;
    contacts.push({ 
      id, name, mobile, mail 
    });
    return id;
  }

};