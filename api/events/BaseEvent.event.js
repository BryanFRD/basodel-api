class BaseEvent {
  
  constructor(io, socket, user){
    this.io = io;
    this.socket = socket;
    this.user = user;
    this.events = [];
  }
  
  registerEvents(events){
    for(const event of events){
      this.events.push(event);
    }
  }
  
  getEvents(){
    return this.events;
  }
  
}

module.exports = BaseEvent;