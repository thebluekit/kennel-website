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
  let feedbackRequest = feedback.addFeedback(req.body.userName, 
    req.body.userEmail, req.body.userPhone, req.body.userQuestion);
  feedbackRequest.then(function(result) {
    res.send(result);
  })
};

export {petPhotos, petInfo, sendFeedback};