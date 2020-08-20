import express from "express";
import {petPhotos, petInfo} from "../controllers/apiController.js";

const apiRouter = express.Router();
 
apiRouter.get("/getDogPhotos", petPhotos);
apiRouter.get("/getDogInfo", petInfo);

export {apiRouter};
