CREATE TABLE gameHistory(
   id VARCHAR(36) NOT NULL UNIQUE,
   players VARCHAR(50),
   information VARCHAR(50),
   createdDate DATETIME,
   lastUpdatedDate DATETIME,
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY(id)
);

CREATE TABLE Role(
   id VARCHAR(36) NOT NULL UNIQUE,
   name VARCHAR(50),
   createdDate VARCHAR(50),
   lastUpdatedDate VARCHAR(50),
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY(id)
);

CREATE TABLE userAccount(
   id VARCHAR(36) NOT NULL UNIQUE,
   username VARCHAR(50),
   xp INT,
   silver INT,
   gold INT,
   createdDate DATETIME,
   lastUpdatedDate DATETIME,
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   roleId VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(roleId) REFERENCES Role(roleId)
);

CREATE TABLE purchase(
   id VARCHAR(36) NOT NULL UNIQUE,
   title VARCHAR(50),
   information VARCHAR(50),
   createdDate DATETIME,
   lastUpdatedDate DATETIME,
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   userAccountId VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(userAccountId) REFERENCES userAccount(userAccountId)
);

CREATE TABLE chatMessage(
   id VARCHAR(36) NOT NULL UNIQUE,
   message VARCHAR(50),
   createdDate VARCHAR(50),
   lastUpdatedDate VARCHAR(50),
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   userAccountId VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(userAccountId) REFERENCES userAccount(userAccountId)
);

CREATE TABLE userCredential(
   id VARCHAR(36) NOT NULL UNIQUE,
   email VARCHAR(50),
   login VARCHAR(50),
   password VARCHAR(50),
   createdDate DATETIME,
   lastUpdatedDate DATETIME,
   isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
   userAccountId VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(userAccountId),
   FOREIGN KEY(userAccountId) REFERENCES userAccount(userAccountId)
);

CREATE TABLE gameHistory_userAccount(
   userAccountId INT,
   gameHistoryId INT,
   PRIMARY KEY(userAccountId, gameHistoryId),
   FOREIGN KEY(userAccountId) REFERENCES userAccount(userAccountId),
   FOREIGN KEY(gameHistoryId) REFERENCES gameHistory(gameHistoryId)
);