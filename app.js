import express from "express";
import favicon from 'serve-favicon';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

import {pagesRouter} from "./routes/pagesRouter.js";
import {apiRouter} from "./routes/apiRouter.js";

const __dirname = path.resolve();

dotenv.config();

let app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/imgs/favicon.ico'));


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use("/", pagesRouter);
app.use("/api", apiRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(8000);