var request = require('superagent');

export function getContacts() {
  return new Promise((resolve) => {
    request
    .get('http://localhost:8080/api/contacts')    
    .end((err, res) => {
      if (err || !res.ok)
        return reject(err);      
      return resolve(res.body);      
    });   
  });  
}

export function getContactDetails(id) {
  return new Promise((resolve) => {
    request
    .get(`http://localhost:8080/api/contact/${id}`)    
    .end((err, res) => {
      if (err || !res.ok)
        return reject(err);      
      return resolve(res.body);      
    });   
  });
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