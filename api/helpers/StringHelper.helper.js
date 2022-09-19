const filter = require('leo-profanity');

filter.add(filter.getDictionary('fr'));

class StringHelper {
  
  static clearBadWords(string){
    return filter.clean(string);
  }
  
}

module.exports = StringHelper;