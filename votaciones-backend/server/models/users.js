'use strict';

//defining user model
Models.users = Meteor.users;

//defining user publication
Publications.usersStudents = {
  namePublish: 'usersStudents',
  nameModel: 'users',
  nameObserve: 'usersStudentsReal',
  find: function (idUser, params) {
    return {'profile.isRemove': false, 'profile.idProfile': 2};
  }
};

Publications.usersJudges = {
  namePublish: 'usersJudges',
  nameModel: 'users',
  nameObserve: 'usersJudgesReal',
  find: function (idUser, params) {
    return {'profile.isRemove': false, 'profile.idProfile': 1};
  }
};

Publications.usersPersonerosCandidates = {
  namePublish: 'usersPersonerosCandidates',
  nameModel: 'users',
  nameObserve: 'usersPersonerosCandidates',
  find: function (idUser, params) {
    return {'profile.isRemove': false, 'profile.idProfile': 2, 'profile.isPersoneroCandidate': true};
  }
};

Publications.usersComptrollerCandidates = {
  namePublish: 'usersComptrollerCandidates',
  nameModel: 'users',
  nameObserve: 'usersComptrollerCandidates',
  find: function (idUser, params) {
    return {'profile.isRemove': false, 'profile.idProfile': 2, 'profile.isComptrollerCandidate': true};
  }
};

Publications.whoIsLoggedPub = {
  namePublish: 'whoIsLogged',
  nameModel: 'users',
  nameObserve: 'whoIsLogged',
  find: function (idUser, params) {
    if (idUser) {
      return {_id: idUser};
    }
  }
};

function createUser(data) {
  var userId;
  var user = {
    username: data.username,
    password: data.password || ' ',
    profile: {
      document: data.username,
      name: data.profile.name,
      canVoteByComptroller: true,
      canVoteByPersonero: true,
      group: data.profile.group,
      grade: data.profile.grade,
      previewImg: data.profile.previewImg,
      idProfile: data.profile.idProfile,
      isRemove: false,
    }
  };
  userId = Accounts.createUser(user);
  
  return {status: 1, message: 'user created', operation: 1, id: userId};
}

function updateUser(data) {
  var future = new Future();
  Accounts.setUsername(data._id, data.username);
  Accounts.setPassword(data._id, data.password || ' ');
  var update = {
    $set: {
      'profile.document': data.username,
      'profile.name': data.profile.name,
      'profile.group': data.profile.group,
      'profile.grade': data.profile.grade,
      'profile.previewImg': data.profile.previewImg,
      'profile.updatedAt': new Date()
    }
  };
  Meteor.users.update(data._id, update, function(err) {
    Utils.hasError(err);
    var result = {
      status: 1,
      message: 'user updated',
      operation: 2,
      id: data._id
    };
    future.return(result);
  });
  return future.wait();
}

function removeUser(idUser) {
  var future = new Future();
  var remove = {
    $set: {
      'profile.isRemove': true,
      username: Random.id()
    }
  };
  Meteor.users.update(idUser, remove, function(err) {
    Utils.hasError(err);
    var result = {
      status: 1,
      message: 'user removed',
      operation: 2,
      id: idUser
    };
    future.return(result);
  });
  return future.wait();
}

function createOrUpdateRating(rating, idTypeRating, idUser) {
   if (rating) {
     rating.candidates.push({idUser: idUser, votes: 0});
     Methods.updateRating(rating);
  }else {
    var rating = {
      candidates: [
	{idUser: idUser, votes: 0},
	{idUser: '0', votes: 0}
      ]
    };
    Methods.createRating(rating, idTypeRating);
  }
}

function removeUserFromRating(rating, idTypeRating, idUser) {
  var candidates = rating.candidates;
  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i].idUser === idUser) {
      rating.candidates.splice(i, 1);
      Methods.updateRating(rating)
      break;
    }
  }
}

function setUserAsPersonero(idUser) {
  var update = {
    $set: {
      'profile.isPersoneroCandidate': true
    }
  };
  var rating = Methods.findRatingByType(1);
  createOrUpdateRating(rating, 1, idUser);
  Meteor.users.update(idUser, update);
}

function setUserAsComptroller(idUser) {
  var update = {
    $set: {
      'profile.isComptrollerCandidate': true
    }
  };
  var rating = Methods.findRatingByType(2);
  createOrUpdateRating(rating, 2, idUser);
  Meteor.users.update(idUser, update);
}

function removeUserAsPersonero(idUser) {
  var update = {
    $set: {
      'profile.isPersoneroCandidate': false
    }
  };
  var rating = Methods.findRatingByType(1);
  removeUserFromRating(rating, 1, idUser);
  Meteor.users.update(idUser, update);
}

function removeUserAsComptroller(idUser) {
  var update = {
    $set: {
      'profile.isComptrollerCandidate': false
    }
  };
  var rating = Methods.findRatingByType(2);
  removeUserFromRating(rating, 2, idUser);
  Meteor.users.update(idUser, update);
}

function whoIsLogged() {
  return {
    status: 1,
    user: Meteor.user()
  }
};

function setAdminOrVoter(config) {
  var update = {
    $set: {
      'profile.isAdmin': config.isAdmin
    }
  };
  Meteor.users.update(config.idUser, update);
}

function saveUsersByExcelFile(fileName) {  
  var excel = new Excel('xlsx');
  var workBook = excel.readFile(Constants.SERVER_FOLDER + Constants.UPLOAD_FOLDER + ConstantsUploadFolders[1] + fileName);
  var workSheets = workBook.SheetNames;
  var workSheet = workSheets[0];
  var row = 2;
  while (workBook.Sheets[workSheet]['B'+row.toString()]) {
    var strRow = row.toString();
    var user = {
      username: workBook.Sheets[workSheet]['E'+strRow].v.toString(),
      profile: {
	name: workBook.Sheets[workSheet]['D'+strRow].v,
	group: workBook.Sheets[workSheet]['C'+strRow].v,
	grade: workBook.Sheets[workSheet]['B'+strRow].v,
	idProfile: 2
      }
    }
    createUser(user);
    row++;
  }
}

function removeAllUsers() {
  var future = new Future();
  var match = {
    'profile.idProfile': 2,
    'profile.isRemove': false
  };
  var quantityUsersToRemove = Models.users.find(match).count();
  for (var i = 0; i < quantityUsersToRemove; i++) {
    var update = {
      $set: {
	'profile.isRemove': true,
	username: Random.id()
      }
    };
    Meteor.users.update(match, update);
  }
}

Methods.userCreate = createUser;
Methods.updateUser = updateUser;
Methods.removeUser = removeUser;
Methods.setUserAsPersonero = setUserAsPersonero;
Methods.setUserAsComptroller = setUserAsComptroller;
Methods.removeUserAsPersonero = removeUserAsPersonero;
Methods.removeUserAsComptroller = removeUserAsComptroller;
Methods.whoIsLogged = whoIsLogged;
Methods.setAdminOrVoter = setAdminOrVoter;
Methods.saveUsersByExcelFile = saveUsersByExcelFile;
Methods.removeAllUsers = removeAllUsers;
