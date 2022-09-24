const Logger = require('../helpers/Logger.helper');
const StringHelper = require('../helpers/StringHelper.helper');
const ChatMessageModel = require('../models/ChatMessage.model');
const BaseEvent = require('./BaseEvent.event');
const ChatMessageValidator = require('../validators/ChatMessage.validator');
const UserAccountModel = require('../models/UserAccount.model');
const jwt = require('jsonwebtoken');

class MessageEvent extends BaseEvent {
  
  constructor(io, socket){
    super(io, socket);
    
    super.registerEvents([
      {name: 'sendMessage', handler: this.sendMessage}
    ]);
    
    this.chatMessageValidator = new ChatMessageValidator();
  }
  
  sendMessage = async (data) => {
    const {value, error} = this.chatMessageValidator.validateCreate(data);
    if(error){
      Logger.error('ChatMessageError: Validation error -> ', error);
      return;
    }
    
    jwt.verify(this.socket.handshake.auth.token, process.env.ACCES_TOKEN, async (err, user) => {
      if(err){
        Logger.error('ChatMessageError: token expired!')
        return;
      }
      
      const userAccount = await UserAccountModel.findByPk(value.userAccountId);
    
      if(!userAccount){
        Logger.error(`ChatMessageError: UserAccount with id ${data.userAccountId} couldn't be found!`);
        return;
      }
      
      ChatMessageModel.create(value)
        .then(v => {
          const json = v.toJSON();
          
          data.messageId = json.id;
          data.username = userAccount.username;
          data.message = StringHelper.clearBadWords(data.message);
          
          this.io.emit('receiveMessage', data);
        })
        .catch(error => {
          Logger.error('sendMessage', error);
        });
    })
    
  }
  
}

module.exports = MessageEvent;