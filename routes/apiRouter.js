import express from "express";
import {petPhotos, petInfo, sendFeedback, petPedigree} from "../controllers/apiController.js";

const apiRouter = express.Router();
 
apiRouter.get("/getDogPhotos", petPhotos);
apiRouter.get("/getDogInfo", petInfo);
apiRouter.get("/getPedigreeLink", petPedigree);
apiRouter.post("/sendFeedback", sendFeedback);

export {apiRouter};
