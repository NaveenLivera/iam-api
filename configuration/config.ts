import express from 'express';
import * as bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import { MongoConnection } from './mongo';
import { CommonRoutes } from '../routes/common.route';
import {UserRoutes} from "../routes/user.route";

class App {
  public app: express.Application;
  private mongoConnection: MongoConnection = new MongoConnection();
  private commonRoutes: CommonRoutes = new CommonRoutes();
  private userRoutes: UserRoutes = new UserRoutes();

  // Routes

  constructor() {
    this.app = express();
    this.config();
    this.mongoConnection.connect();
    this.commonRoutes.route(this.app);
    this.userRoutes.route(this.app);
  }

  private config(): void {

    this.app.use(bodyParser.json({ limit: '10mb' }));

    this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    const logDir = path.join(__dirname, '../log');
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, '../log/api-log.log'), { flags: 'a' }
    );

    this.app.use(bearerToken());

    this.app.use((req, res, next) => {
      const allowedOrigins = [
        'https://yaatter.xyz',
        'https://dev.yaatter.xyz',
        'https://qa.yaatter.xyz',
        'http://localhost:4200',
        'http://localhost:2521'
      ];

      const origin = req.headers.host;
      if (allowedOrigins.indexOf(<string>origin) > -1) {
        // @ts-ignore
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      }

      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');;
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // In case if request comes with '/api' prefix route, then have to conclude it
      if (req.url.substr(0, 4) === '/api') {
        req.url = req.url.substr(4);
      }

      // Finally pass next()
      next();
    });
  }
}

export default new App().app;
