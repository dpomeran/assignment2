var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'touro.msin.636@gmail.com',
        pass: 'tourocollege'
    }
});

http.createServer(function (req, res) {
	
	if(req.method == "POST")
	{
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var name = fields.name;
			var email = fields.email;
			var subject = fields.subject;
			var path = files.filetoupload.path;
		
		
			fs.readFile(path, function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}
				var mailOptions = {
				from: 'touro.msin.636@gmail.com',
				to: email,
				subject: 'For '+ name + ': ' + subject,
				html: data
				};

				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
				return res.end();
			});
		});
			res.write("Your submission has been sent!");
			res.end();	
	}
	else{
		fs.readFile('./html_email.html', function(err, data) {
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}
}).listen(3000);
