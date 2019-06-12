import express    = require('express');
import apiRouter = require('./app/routes/api');
import bodyParser = require('body-parser');
import expressValidator = require('express-validator');

import {MyError} from './app/models/IError';
import {NextFunction, Request, Response} from 'express';

import {Sequelize} from 'sequelize-typescript';
import swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swagger.json');





class App {

  public app: express.Application;
  private sequelize = new Sequelize({
    dialect: 'sqlite',
    sync: { force: false, schema: 'true' },
    storage: './data/testDB.db',
    modelPaths: [__dirname + '/app/models/**/*.model.ts'],

    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
  });

  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(expressValidator());

    this.app.listen(3000, () => {
      console.log('Express app listening on port 3000!');
    });

  }

  private routes(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use('/api', apiRouter);
    this.app.use(this.errorHandler);
    this.app.get('/*', function (req, res) {
      res.json({ Error: 404 });
    });
  }

  private errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log('Error handler');
    //res.status(err.code);
    //res.statusMessage = err.status;
    res.json({ message: err.message});
  };
}

export default new App().app;

