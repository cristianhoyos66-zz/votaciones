//return route where file is saved
Methods.getRouteFile = function (data) {
  
  var fileName = Utils.generateRandomFileName(data.fileName);
  var fileResult = Utils.saveFile(ConstantsUploadFolders[data.folder], fileName, data.fileData);

  var result = {
    fileName: fileName,
    filePath: fileResult.relativeFilePath,
  };

  return result;
};
