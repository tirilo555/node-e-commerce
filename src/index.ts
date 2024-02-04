import express, { Express } from 'express';
import 'reflect-metadata';
import path from 'path';
import { create } from 'express-handlebars';
import { useExpressServer } from 'routing-controllers';
import * as controllersApp from './app/controllers/app';
import * as controllersAdmin from './app/controllers/admin';
import * as controllersAccount from './app/controllers/account';
import DataSource from './db/data-source';
import cookieParser from 'cookie-parser';
import config from './config';
import TokenMiddleware from './app/middlewares/token.middleware';

const hbs = create({
  extname: '.hbs',
  layoutsDir: 'src/themes/default/layouts',
});

class AppServer {
  protected app: Express;
  protected http = null;

  constructor() {
    this.app = express();
    this.app.use(cookieParser(config.cookieSecret));
    this.app.use(express.static('public'));
    this.app.engine('.hbs', hbs.engine);
    this.app.set('view engine', '.hbs');
    this.app.set('views', `${path.normalize(`${__dirname}`)}/themes/default`);
  }

  private appRoutes() {
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      validation: { forbidUnknownValues: false },
      controllers: Object.values(controllersApp),
    });
  }

  private adminRoutes() {
    useExpressServer(this.app, {
      routePrefix: '/backend/api',
      defaultErrorHandler: false,
      validation: { forbidUnknownValues: false },
      controllers: Object.values(controllersAdmin),
      middlewares: [TokenMiddleware],
    });
  }
  private accountRoutes() {
    useExpressServer(this.app, {
      routePrefix: '/account/api',
      defaultErrorHandler: false,
      validation: { forbidUnknownValues: false },
      controllers: Object.values(controllersAccount),
      middlewares: [TokenMiddleware],
    });
  }

  listen(port: number) {
    this.appRoutes();
    this.adminRoutes();
    this.app.listen(port, 'localhost', () => {
      DataSource.initialize();
      console.log(`server listening on: ${port}`);
    });
  }
}

new AppServer().listen(3000);
