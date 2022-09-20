const filter = require('leo-profanity');

filter.add(filter.getDictionary('fr'));

class StringHelper {
  
  static clearBadWords(string){
    return filter.clean(string);
  }
  
  static retrieveColumnFromSQLError(sqlMessage){
    const arr = /'(\w*)'$/.exec(sqlMessage);
    
    if(arr)
      return arr[0].replaceAll('\'', '')
      
    return undefined;
  }
  
}

module.exports = StringHelper;