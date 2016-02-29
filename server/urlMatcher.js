'use strict';

var UrlPattern = require('url-pattern');

var urlMatcher = [];

module.exports = {
  
  define(pattern, dataCallback) {
    urlMatcher.push({
      matcher: new UrlPattern(pattern), 
      dataCallback
    });
  },

  match(url, callback) {
    let current, match;
    for (current of urlMatcher) {    
      match = current.matcher.match(url);      
      if (match)
        return callback(current.dataCallback(match));
    }
    callback();
  }
};