import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');

import { AppDataSource } from './data-source';
import { routes } from './routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    app.use(cors());

    app.use(express.static(path.join(__dirname, './uploads')));
    app.use('/uploads', express.static(path.join(__dirname, './uploads')));

    app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        useTempFiles: true,
        // dir for windows PC
        tempFileDir: path.join(__dirname, './uploads'),
      })
    );
    app.use(bodyParser.json());

    // register express routes from defined application routes
    routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(5000);

    console.log(
      'Express server has started on port 5000. Open http://localhost:5000/ to see results'
    );
  })
  .catch((error) => console.log(error));
