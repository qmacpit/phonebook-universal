import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, Router, Route} from 'react-router';
import appRooter from '../client/js/appRouter';
import configureStore from '../client/js/store/contactsStore';

var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var methodOverride = require('method-override');
var path = require('path');
var urlMatcher = require('./urlMatcher');
var dataProvider = require('./dataProvider');

const app = express();
const server = require('http').Server(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({}));
app.use(methodOverride());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/')));

app.get('/api/contacts', (req, res) => {
  res.send(dataProvider.getContacts());
});

app.get('/api/contact/:id', (req, res) => {
  let id = parseInt(req.params.id); 
  return res.send(dataProvider.getDetails(id)); 
});

app.post('/api/contact', (req, res) => {
  res.status(200).send({
    id: dataProvider.createContact(req.body)
  });
});

urlMatcher.define(
  '/contact(/:id)',
  function(params) {
    let currentStore = [];
    let id = parseInt(params.id);
    let current;
    let data = dataProvider.getContacts();
    for (current of data) {      
      if (current.id === id) {
        let details = dataProvider.getDetails(id);
        current.mobile = details.mobile;
        current.mail = details.mail;        
      }
      currentStore.push(current);
    }
    return currentStore;
  }
);

app.get('/', render);
app.get('/add', render);
app.get('/contact/:id', render);

function render(req, res) {  
  match({ routes: appRooter, location: req.url }, (error, redirectLocation, renderProps) => {    
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {      
      urlMatcher.match(req.url, (store) => {        
        if (!store)
          store = dataProvider.getContacts();
        store = configureStore({
          contacts: store
        });
        res.render('index', {
          markup: renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          ),
          initialState: store.getState()
        });
      });  
    } else {      
      res.status(404).send('Not found')
    }
  })
}
server.listen(8080, function() {
  console.log('server started');
});