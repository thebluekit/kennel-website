import express from "express";
import {indexPage, salesPage, petPage} from "../controllers/pagesController.js";

const pagesRouter = express.Router();
 
pagesRouter.get("/", indexPage);
pagesRouter.get('/sales', salesPage);
pagesRouter.get('/dog', petPage);

export {pagesRouter};