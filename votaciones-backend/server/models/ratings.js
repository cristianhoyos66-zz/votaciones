'use strict';

//defining ratings model
Models.rating = new Mongo.Collection('ratings');

function ratingPublication(idUser, params) {
  return {isStarted: true};
}

function ratingAllPublication(idUser, params) {
  return {};
} 

function getExternalInformation(rating) {
  var candidates = rating.candidates;
  var auxUsersInformation = [];
  for (var i = 0; i < candidates.length; i++) {
    var userInformation = Models.users.findOne(candidates[i].idUser);
    userInformation ? userInformation.votes = candidates[i].votes : userInformation = {profile: {name: 'Voto en blanco'}, votes: candidates[i].votes};    
    auxUsersInformation.push(userInformation);
  }
  rating.usersInformation = auxUsersInformation;
  return rating;
}

function bothRatingPublication(rating) {
  return getExternalInformation(rating);
}

function createRating(rating, idTypeRating) {
  var future = new Future();
  rating.isStarted = false;
  rating.total = 0;
  rating.idType = idTypeRating;
  Models.rating.insert(rating, function(err, id) {
    Utils.hasError(err);
    var result = {
      status: 1,
      msg: 'rating created',
      operation: 1,
      idRating: id 
    };
    future.return(result);
  });
  return future.wait();
}

function updateRating(rating) {
  var idRating = rating._id;
  delete rating._id;
  var future = new Future();
  Models.rating.update(idRating, rating, function(err, id) {
    Utils.hasError(err);
    var result = {
      status: 1,
      msg: 'rating updated',
      operation: 2,
      idRating: idRating 
    };
    future.return(result);
  });
  return future.wait();
}

function startRating(idTypeRating) {
  var rating = Models.rating.findOne({idType: idTypeRating});
  var update = {
    $set: {
      isStarted: true
    }
  };
  Models.rating.update(rating._id, update);
}

function stopRating(idTypeRating) {
  var rating = Models.rating.findOne({idType: idTypeRating});
  var update = {
    $set: {
      isStarted: false
    }
  };
  Models.rating.update(rating._id, update);
}

function findRatingByType(idType) {
  return Models.rating.findOne({idType: idType});
}

function refreshVotesToAllCandidates(arrayCandidates) {
  for (var i = 0; i < arrayCandidates.length; i++) {
    arrayCandidates[i].votes = 0;
  }
  return arrayCandidates;
}

function refreshRating(idTypeRating) {
  var rating = Models.rating.findOne({idType: idTypeRating});
  var updateRating = {
    $set: {
      isStarted: false,
      total: 0,
      candidates: refreshVotesToAllCandidates(rating.candidates)
    }
  };
  var updateUsers = {
    $set: {
      'profile.canVoteByComptroller': true,
      'profile.canVoteByPersonero': true
    }
  };
  Models.rating.update(rating._id, updateRating);
  Models.users.update({}, updateUsers, {multi: true});
}

function addVoteToCandidate(arrayCandidates, idSelectedCandidate) {
  for (var i = 0; i < arrayCandidates.length; i++) {
    if (idSelectedCandidate === arrayCandidates[i].idUser) {
      arrayCandidates[i].votes = arrayCandidates[i].votes + 1;
      break;
    }
  }
  return arrayCandidates;
}

function rate(config) {
  var rating = Models.rating.findOne({idType: config.idType});
  var loggedUser = Meteor.user();
  var updateRating = {
    $set: {
      candidates: addVoteToCandidate(rating.candidates, config.idSelectedCandidate),
      total: rating.total + 1
    }
  };
  if (config.idType === 1) {
    var updateUser = {
      $set: {
	'profile.canVoteByPersonero': false
      }
    };
  }else {
    var updateUser = {
      $set: {
	'profile.canVoteByComptroller': false
      }
    };
  }
  Models.users.update(loggedUser._id, updateUser);
  Models.rating.update(rating._id, updateRating);
}

Publications.ratings = {
  namePublish: 'ratings',
  nameModel: 'rating',
  nameObserve: 'ratings',
  find: ratingPublication,
  both: bothRatingPublication
}

Publications.ratingsAll = {
  namePublish: 'ratingsAll',
  nameModel: 'rating',
  nameObserve: 'ratingsAll',
  find: ratingAllPublication,
  both: bothRatingPublication
}

Methods.createRating = createRating;
Methods.updateRating = updateRating;
Methods.startRating = startRating;
Methods.stopRating = stopRating;
Methods.findRatingByType = findRatingByType;
Methods.refreshRating = refreshRating;
Methods.rate = rate;
