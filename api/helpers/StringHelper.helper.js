class StringHelper {
  
  static toCamelCase(string){
    return string?.charAt(0).toLowerCase() + string?.slice(1);
  }
  
}

module.exports = StringHelper;