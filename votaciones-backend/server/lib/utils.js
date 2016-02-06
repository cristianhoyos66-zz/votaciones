'use strict';


//general method to save file
Utils.saveFile = function (path, fileName, fileData) {
  var relativeFolderPath = Constants.UPLOAD_FOLDER + path;
  var relativeFilePath = relativeFolderPath + fileName;
  var folderPath = Constants.SERVER_FOLDER + relativeFolderPath;
  var filePath = folderPath + fileName;

  if (!Fs.existsSync(folderPath)) {
    Fs.mkdirSync(folderPath);
  }

  Fs.writeFileSync(filePath, new Buffer(fileData, 'binary'));
  return {
    relativeFolderPath: relativeFolderPath,
    relativeFilePath: relativeFilePath,
    folderPath: folderPath,
    filePath: filePath
  };
};

Utils.getFileExtension = function (fileName) {
  return '.' + fileName.split('.').last();
};

Utils.generateRandomFileName = function (fileName) {
  return Date.now() + Math.randomLimit(0, 999) + String.randomString(10) + Utils.getFileExtension(fileName);
};

Utils.hasError = function (err) {
  if (err) {
    throw new Meteor.Error(err);
  }
};

//Globalizing publish method
Utils.publish = function (config) {
  Meteor.publish(config.namePublish, function (data) {
    var self = this;
    var initializing = true;
    var models;
    if (config && typeof config.find === 'function') {
      models = Models[config.nameModel].find(config.find(this.userId, data), config.other);
    } else {
      models = Models[config.nameModel].find(config.find, config.other);
    }
    var modelsChanges = models.observeChanges({
      added: function (id, model) {
	if (!initializing) {
	  model._id = id;
	  var fun = config.added || config.both;
	  if (fun) {
	    model = fun(model, data, 'added');
	  }

	  if (model) {
	    self.added(config.nameObserve || config.nameModel, id, model);
	  }
	}
      },
      changed: function (id, fields) {
	var fun = config.changed || config.both;
	if (fun) {
	  var model = Models[config.nameModel].findOne(id, config.other);
	  fields = fun(model, data, 'changed');
	}

	if (fields) {
	  self.changed(config.nameObserve || config.nameModel, id, fields);
	}
      },
      removed: function (id) {
	if (config.removed) {
	  config.removed(id);
	}
	self.removed(config.nameObserve || config.nameModel, id);
      }
    });
    initializing = false;
    models.forEach(function (model) {
      var fun = config.added || config.both;
      if (fun) {
	model = fun(model, data, 'added');
      }

      if (model) {
	self.added(config.nameObserve || config.nameModel, model._id, model);
      }
    });
    self.ready();
    self.onStop(function () {
      modelsChanges.stop();
    });
    return self.ready();
  });
};
