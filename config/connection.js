/*var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongo: {
			host: '127.0.0.1',
			port: 27017,
			database :'user',
		}
	},
	
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}*/
/*
var MongoClient = require('mongodb').MongoClient
, format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/user');*/

var Db = require('mongodb').Db;

var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

//the MongoDB connection
var connectionInstance;
module.exports = function(callback) {
 //if already we have a connection, don't connect to database again
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }

  var db = new Db('user', new Server("127.0.0.1","27017", { auto_reconnect: true }));
  db.open(function(error, databaseConnection) {
	 if (error) {
    	throw new Error(error);
    	}
    connectionInstance = databaseConnection;
    callback(databaseConnection);
  });
};