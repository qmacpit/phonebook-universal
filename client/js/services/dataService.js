import fetch from 'isomorphic-fetch';
var request = require('superagent');

var contacts = [
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

export function getContacts() {
  return fetch('http://localhost:8080/api/contacts')
    .then(response => response.json());
  // return new Promise((resolve) => {
  //   let data = [];
  //   for (let current of contacts) {
  //     let {id, name} = current;
  //     data.push({ id, name});
  //   }
  //   return resolve(data);
  // });  
}

export function getContactDetails(id) {
  return fetch(`http://localhost:8080/api/contact/${id}`)
    .then(response => response.json());
  // return new Promise((resolve) => {    
  //   for (let current of contacts) {
  //     if (current.id === id)
  //       return resolve(current);
  //   }
  //   return resolve({});
  // });  
}

export function createContact(contact) {  
  return new Promise((resolve, reject) => {    
    request
    .post('http://localhost:8080/api/contact')
    .send(contact)   
    .end((err, res) => {
      if (err || !res.ok)
        return reject(err);      
      return resolve(res.body.id);      
    });    
  });    
}