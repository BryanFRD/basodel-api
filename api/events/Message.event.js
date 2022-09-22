const Logger = require('../helpers/Logger.helper');
const StringHelper = require('../helpers/StringHelper.helper');
const ChatMessageModel = require('../models/ChatMessage.model');
const BaseEvent = require('./BaseEvent.event');
const ChatMessageValidator = require('../validators/ChatMessage.validator');

class MessageEvent extends BaseEvent {
  
  constructor(io, socket){
    super(io, socket);
    
    super.registerEvents([
      {name: 'sendMessage', handler: this.sendMessage}
    ]);
  }
  
  sendMessage = async (data) => {
    const {value, error} = ChatMessageValidator.validateCreate(data)
    
    if(error){
      
      Logger.warn('sendMessage', error)
    }
    
    ChatMessageModel.create()
      .then(value => {
        json = value.toJSON();
        data.messageId = json.id;
        
        data.message = StringHelper.clearBadWords(data.message);
        this.io.emit('receiveMessage', data);
      })
      .catch(error => {
        Logger.error('sendMessage', error);
      })
    
  }
  
}

module.exports = MessageEvent;