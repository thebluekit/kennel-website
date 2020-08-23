import {petExplorer} from '../models/petExplorer.js';
import {feedback} from '../models/feedback.js';

let petPhotos = function(req, res) {
  let petId = req.param('id');
  let petPhotos = petExplorer.getPetPhotosById(petId);

  petPhotos.then(function(result) {
    res.send(result);
  })
};

let petInfo = function(req, res) {
  let petId = req.param('id');
  let petInfo = petExplorer.getPetInfo(petId);

  petInfo.then(function(result) {
    res.send(result);
  })
};

let sendFeedback = function(req, res) {
  let userName = req.param('userName');
  let userEmail = req.param('userEmail');
  let userPhone = req.param('userPhone');
  let userQuestion = req.param('userQuestion');

  if (typeof userPhone == 'undefined' && typeof userEmail == 'undefined') {
    res.send('phone and email is null')
  }
  else {
    let feedbackRequest = feedback.addFeedback(userName, userEmail, userPhone, userQuestion);
    feedbackRequest.then(function(result) {
      res.send(result);
    })
  }
};

export {petPhotos, petInfo, sendFeedback};