var model = require("../model/UserModel");
var  gapi = require('../lib/gapi');
exports.home = function(req, res) {
	 res.render('index');
    
   
};

exports.adduser = function(req, res) {
	console.log(req.files);
	req.assert('username', 'Name is required').notEmpty();           //Validate name
    req.assert('lastname', 'last name is required').notEmpty();
    var errors = req.validationErrors();
	 //setTimeout(function(){
		
    /*	  console.log( "user: " );
	  },5000);*/
   	if( !errors){   //No errors were found.  Passed Validation!
	        res.render('home', { 
	            title: 'Form Validation Example',
	            errors :'',
	               
	        });
	        model.adduser(req.body,req.files);
	    }
	    else {   //Display errors to user
	        res.render('home', { 
	            title: 'Form Validation Example',
	            errors: errors,
	           values :req.body,
	           method:'post',
	        });
	    }
 //  res.render('home', { title: 'Ninja Store'});
     
     
};

exports.listuser = function(req, res) {
	
	var code = req.query.code;
	gapi.client.getToken(code, function(err, tokens) {
		if (!err) {
			gapi.client.setCredentials(tokens);
		}
			//function to get user information who is logging
		gapi.plus.people.get({
			userId : 'me',
			auth : gapi.client
		}, function(err, response) {
			//console.log(response);
			if(response!=null){
				 model.insertLoginDetails(response);
				
				model.getlist(function(err, records) {
					res.render('list', {
						records : records,
						userDetails :response,
					});
				});
			}else{
				console.log("kkk");
				res.redirect('/');
			}
		})

	});

	

};
	
	exports.edituser= function(req,res) {
		model.getvalues(req.params[0],function(err, values) {
			 res.render('home', { title: values,errors :''});
				
		});
	};
	
	exports.updateuser= function(req,res) {
			model.updatevalues(req.body,function(err, values) {
			 res.render('list', { records: values});
		});
	};
	
	exports.deleteuser= function(req,res) {
		model.deletevalues(req.params[0],function(err, values) {
		 //return exports.listuser(req,res);  //to call other method
			res.redirect('/listuser');			//to change route
			
	});
	};
	
	exports.listapi= function(req,res) {
		model.getlist(function(err, records) {
	 res.send('list', { records: records});
	});
};