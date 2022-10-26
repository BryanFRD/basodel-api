const parseSearchParams = (req, res, next) => {
  const params = Object.fromEntries(new URLSearchParams(req.query));
    
  if(!params.include)
    params.include = [];
  else
    params.include = params.include.split(',');
  
  //TODO 1 seul filtre, filtrer Object.values ???
  
  //TODO Ajouter la possibiliter de mettre les includes, where etc dans le body
  if(this.model){
    params.include.push(...this.requiredIncludes);
    
    params.include = Object.values(this.model.associations)
      .filter(({as}) => params.include?.includes(as) && !this.exludedIncludes.includes(as));
    
  } else {
    params.include = [];
  }
  
  req.searchParams = params;
  
  next();
}

module.exports = parseSearchParams;