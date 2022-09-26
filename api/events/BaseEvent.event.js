class BaseEvent {
  
  constructor(io, socket){
    this.io = io;
    this.socket = socket;
    this.allEvents = [];
    this.events = [];
    this.authEvents = [];
  }
  
  registerEvents(events){
    for(const event of events){
      this.allEvents.push(event);
      
      if(event.requiresAuth)
        this.authEvents.push(event);
      else
        this.events.push(event);
    }
  }
  
  getAllEvents(){
    return this.allEvents;
  }
  
  getEvents(){
    return this.events;
  }
  
  getAuthEvents(){
    return this.authEvents;
  }
  
}

module.exports = BaseEvent;