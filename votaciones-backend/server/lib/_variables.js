Models = {};
Methods = {};
Publications = {};
Utils = {};
Future = Npm.require('fibers/future');
Fs = Npm.require('fs');
mime = Meteor.npmRequire('mime');

ConstantsUploadFolders = [
  'users/',
  'excel_files/'
];

Constants = {
  URL_FRONTEND: 'http://127.0.0.1:9000/#/',
  SERVER_FOLDER: process.env.PWD + '/',
  UPLOAD_FOLDER: '.uploads/',
  ERROR_404: '.404.html',
}
