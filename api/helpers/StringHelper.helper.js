const filter = require('leo-profanity');

filter.add(filter.getDictionary('fr'));

String.prototype.upperCaseFirst = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.clearBadWords = function(){
  return filter.clean(string);
}

String.prototype.retrieveColumnFromSQLError = function(){
  const arr = /'(\w*)'$/.exec(sqlMessage);
  
  if(arr)
    return arr[0].replaceAll('\'', '');
  
  return 'error';
}