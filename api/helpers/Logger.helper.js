class Logger {
  
  static log = (...messages) => {
    console.log(...messages);
  }
  
  static error = (...messages) => {
    console.error('\x1b[31m%s', ...messages);
  }
  
  static warn = (...messages) => {
    console.warn('\x1b[33m%s', ...messages);
  }
  
}

module.exports = Logger;