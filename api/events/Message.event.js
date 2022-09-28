const Logger = require('../helpers/Logger.helper');
const StringHelper = require('../helpers/StringHelper.helper');
const ChatMessageModel = require('../models/ChatMessage.model');
const BaseEvent = require('./BaseEvent.event');
const ChatMessageValidator = require('../validators/ChatMessage.validator');

class MessageEvent extends BaseEvent {
  
  constructor(io, socket, user){
    super(io, socket, user);
    
    super.registerEvents([
      {name: 'sendMessage', handler: this.sendMessage}
    ]);
    
    this.chatMessageValidator = new ChatMessageValidator();
  }
  
  sendMessage = async (data) => {
    const {value, error} = this.chatMessageValidator.validateCreate(data);
    if(error){
      Logger.error('ChatMessageError: ', error);
      return;
    }
    
    if(!this.user){
      Logger.error(`ChatMessageError: UserAccount not registered!`);
      return;
    }
    
    ChatMessageModel.create(value)
      .then(v => {
        const json = v.toJSON();
        
        data.messageId = json.id;
        data.username = this.user.username;
        data.message = StringHelper.clearBadWords(data.message);
        data.createdAt = json.createdAt;
        
        this.io.emit('receiveMessage', data);
      })
      .catch(error => {
        Logger.error('sendMessage', error);
      });
  }
  
}

module.exports = MessageEvent;