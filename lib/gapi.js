var googleapis = require('googleapis'),
    OAuth2Client = googleapis.auth.OAuth2,
    client = '844081398567-ral9n7prt9rnkp9g2ka6egvktdid50sf.apps.googleusercontent.com',
    secret = 'yviZJUXd6IJcZpoim0qRP02B',
    redirect = 'http://localhost:3011/listuser',
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(client, secret, redirect);

var plus = googleapis.plus('v1');  //to get user google plus information

var url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: 'https://www.googleapis.com/auth/plus.me   https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read '
	});

calendar_auth_url = oauth2Client.generateAuthUrl({
	  access_type: 'offline',
	  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
	});


exports.url = calendar_auth_url;
exports.client = oauth2Client;// to get user access token
exports.plus = plus;
