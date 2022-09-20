const StringHelper = require('../helpers/StringHelper.helper');
const BaseEvent = require('./BaseEvent.event');

class Message extends BaseEvent {
  
  constructor(io, socket){
    super(io, socket);
    
    super.registerEvents([
      {name: 'sendMessage', handler: this.sendMessage}
    ]);
  }
  
  sendMessage = (data) => {
    data.message = StringHelper.clearBadWords(data.message);
    this.io.emit('receiveMessage', data);
  }
  
}

module.exports = Message;