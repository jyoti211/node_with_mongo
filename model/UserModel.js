var mongoDbConnection = require('../config/connection.js');
var ObjectID = require('mongodb').ObjectID;
var autoIncrement = require('mongodb-autoincrement');

/*
exports.adduser = function(req, res) {
mongoDbConnection(function(databaseConnection) {
	 databaseConnection.collection('user', function(error, collection) {
		 username = req.username || 'Anonymous';
		 var user1 = {name: username};
	   	    // Insert some users
	    collection.insert([user1], function (err, result) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Inserted ');
	      }
	    });
	    
	  var userlist = []; 
      collection.find().toArray(function(error, results) {
    	 console.log("hdhdhdhdhhd");
    	  //blah blah
    	console.log(results);
    });
      
    });
  });
};
*/

function getNextSequenceValue(sequenceName){
	   var sequenceDocument = db.counters.findAndModify(
	      {
	         query:{_id: sequenceName },
	         update: {$inc:{sequence_value:1}},
	         new:true
	      });
	   return sequenceDocument.sequence_value;
	}


module.exports = {
		
	adduser: function(req,reqf ,res){
		mongoDbConnection(function(databaseConnection) {
			 databaseConnection.collection('user', function(error, collection) {
		 username = req.username || 'Anonymous';
		 lastname = req.lastname || 'Anonymous';
		 picture = reqf.userPhoto.name ;
		 var user1 = {name: username,lastname:lastname,picture:picture};
	   	    // Insert some users
	    collection.insert([user1], function (err, result) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Inserted ');
	      }
	    });
			 });
		});
	},
	getlist: function(req,res) {  
		mongoDbConnection(function(databaseConnection) {
			 databaseConnection.collection('user', function(error, collection) {
				 
			   collection.find(res).toArray(req);	
			 });
		});
	},
	
	getvalues: function(val,req,res) {  
		mongoDbConnection(function(databaseConnection) {
			 databaseConnection.collection('user', function(error, collection) {
					collection.find({'_id': new ObjectID(val)}).toArray(req);
			});
		});
	},
	updatevalues: function(val,req,res) {  
			mongoDbConnection(function(databaseConnection) {
			 databaseConnection.collection('user', function(error, collection) {
					
					collection.update({'_id': new ObjectID(val.id)},
							 {$set: {'name':val.username,'lastname' :val.lastname}});
					 collection.find(res).toArray(req);	 	
			});
		});
	},
	
	deletevalues: function(val,req,res) {  
		mongoDbConnection(function(databaseConnection) {
		 databaseConnection.collection('user', function(error, collection) {
				collection.remove({'_id': new ObjectID(val)});
				 collection.find(res).toArray(req);	 
				
		});
	});
},
insertLoginDetails: function(val,res) {
	mongoDbConnection(function(databaseConnection) {
	 databaseConnection.collection('loginuser', function(error, collection) {
		autoIncrement.getNextSequence(databaseConnection, 'loginuser','_id', function (err, autoIndex) {
		 var loginuser = {
				 _id:autoIndex,
				 firstname: val.name.givenName,lastname:val.name.familyName,
				 email:val.emails[0].value};
	   	    // Insert some users
	    collection.insert([loginuser], function (err, result) {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Inserted ');
	      }
	    });	
			
	});
});
	});
}
		
};