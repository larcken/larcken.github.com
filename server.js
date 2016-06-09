var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function(request,response){
	var pathname = decodeURI(url.parse(request.url).pathname);

	console.log(pathname);

	if(pathname == '' || pathname == '/')
		pathname = '/mcard/index.html';

	var fullpath = path.join(process.cwd().replace('/mcard',''), pathname);
	var ext = pathname.split('.');
	ext = ext[ext.length-1] || 'plain';

	try{
		if(fs.statSync(fullpath).isFile()){
			fs.readFile(fullpath, 'binary', function(err, file){
				if(err){
					console.log(err);

					response.writeHeader(500, {'Content-Type':'text/plain'});
					response.write('500 Server Error\n');
					response.end();
					return;
				}

				response.writeHeader(200, {'Content-Type':'text/'+ext});
				response.write(file, 'binary');
				response.end();
			});
			return;
		}
	}catch(e){
		console.log(e.stack);
	}

	response.writeHeader(404, {'Content-Type':'text/plain'});
	response.write('404 Not Found\n');
	response.end();

}).listen(8888);

console.log('Server running');