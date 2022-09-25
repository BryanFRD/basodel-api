class BaseEvent {
  
  constructor(io, socket){
    this.io = io;
    this.socket = socket;
  }
  
  registerEvents(events){
    this.events = events;
  }
  
  getEvents(){
    return this.events ?? [];
  }
  
}

module.exports = BaseEvent;