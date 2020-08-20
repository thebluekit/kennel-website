import {petExplorer} from '../models/petExplorer.js';

let indexPage = function(request, response) {
  petExplorer.getPetsMainInfo().then((result) =>
      response.render('index', result))
};
  
let salesPage = function(request, response) {
    let dogsOnSale = petExplorer.getPetsOnSale();
    dogsOnSale.then((result) => {
      response.render('sales', result); console.log(result)})
};
  
let petPage = function(request, response) {
    var dogId = request.param('id');
    let dogInfo = petExplorer.getPetInfo(dogId);
  
    dogInfo.then((result) =>
      response.render('dog', result))
};

export {indexPage, salesPage, petPage}