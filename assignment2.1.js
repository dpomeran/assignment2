var http = require ('http');
var fs = require('fs');
var path = require('path'); 
var { parse } = require('querystring');
var nodemailer = require('nodemailer');
var url = require('url');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'touro.msin.636@gmail.com',
        pass: 'tourocollege'
    }
});

var carrierTypes = { "att":"@txt.att.net", "tmobil":"@tmomail.net",  "mento": "@mymetropcs.com", "verizon": "@vtext.com", "sprint":"@messaging.sprintpcs.com"}; 

http.createServer(function(req,res){
	var fileStream = fs.createReadStream("./contact.html");
	if(req.method == "POST")
	{
	    fileStream.pipe(res); 
		var body = '';
		req.on('data', function (chunk){
			body += chunk.toString();
		});
		req.on('end', function (){
			var q = url.parse(req.url, true).query;
			var name =q.name;
			var email =q.email;
			var mobile =q.mobile;
			var subject = q.subject;
			var message = q.message;
			var carrier = q.carrier;
			//fs.appendFile('./test.txt', name + ' ' + email + ' '+ mobile , function(err){
			//	if(err) throw err;
			if(q.contact=='email'){
						console.log('Its email!!!! ' + q.contact);
				
				var mailOptions = {
					from: 'touro.msin.636@gmail.com',
					to: email,
					subject: 'For '+ name + ': ' + subject,
					text: message
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
			}
			else{
				Console.log('Then its an SMS');
				var mailOptions = {
					from: 'touro.msin.636@gmail.com',
					to: mobile+carrierTypes[carrier],
					subject: 'For '+ name + ': ' + subject,
					text: message
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
						console.log('Text sent: ' +  mobile+carrierTypes[carrier]);
					}
				});
			}
		});
		res.write("Your submission has been sent!");
		res.end();
	}
	else
	{
		fileStream.pipe(res);
	}
//	});
}).listen(8080);
console.log('listening on port 8080');