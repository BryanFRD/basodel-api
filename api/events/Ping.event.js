const { date } = require('joi');
const BaseEvent = require('./BaseEvent.event');

class PingEvent extends BaseEvent {
  
  constructor(io, socket){
    super(io, socket);
    
    super.registerEvents([
      {name: 'ping', handler: this.ping}
    ]);
  }
  
  ping = async (data) => {
    data();
  }
  
}

module.exports = PingEvent;