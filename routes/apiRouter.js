import express from "express";
import {petPhotos, petInfo, sendFeedback} from "../controllers/apiController.js";

const apiRouter = express.Router();
 
apiRouter.get("/getDogPhotos", petPhotos);
apiRouter.get("/getDogInfo", petInfo);
apiRouter.post("/sendFeedback", sendFeedback);

export {apiRouter};
