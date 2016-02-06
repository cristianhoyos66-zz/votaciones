'use strict';
Router.map(function () {
  this.route('uploads', {
    path: '/' + Constants.UPLOAD_FOLDER + ':file(.*)',
    where: 'server',
    action: function () {
      var error = false;
      var data;
      var filePath = Constants.SERVER_FOLDER + Constants.UPLOAD_FOLDER + this.params.file;
      try {
	data = Fs.readFileSync(filePath);
      } catch (e) {
	error = true;
	data = Fs.readFileSync(Constants.SERVER_FOLDER + Constants.ERROR_404);
      }

      if (error) {
	this.response.writeHead(404, {
	  'Content-Type': 'text/html'
	});
      } else {
	this.response.writeHead(200, {
	  'Content-Type': mime.lookup(filePath)
	});
      }
      this.response.write(data);
      this.response.end();
    }
  });
});
