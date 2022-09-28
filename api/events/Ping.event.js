const BaseEvent = require('./BaseEvent.event');

class PingEvent extends BaseEvent {
  
  constructor(io, socket, user){
    super(io, socket, user);
    
    super.registerEvents([
      {name: 'ping', handler: this.ping}
    ]);
  }
  
  ping = async (data) => {
    data();
  }
  
}

module.exports = PingEvent;