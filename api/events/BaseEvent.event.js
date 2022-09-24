class BaseEvent {
  
  constructor(io, socket){
    this.io = io;
    this.socket = socket;
    
    io.use((socket, next) => {
      // console.log('Auth:', socket?.auth?.token);
      
      next();
    })
  }
  
  registerEvents(events){
    this.events = events;
  }
  
  getEvents(){
    return this.events ?? [];
  }
  
}

module.exports = BaseEvent;