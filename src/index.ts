import express, { Express } from 'express';
import 'reflect-metadata';
import path from 'path';
import { create } from 'express-handlebars';
import { useExpressServer } from 'routing-controllers';
import * as controllersApp from './app/controllers/app';
import { HomeController } from './app/controllers/app';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import DataSource from './db/data-source';

const hbs = create({
  extname: '.hbs',
  layoutsDir: 'src/themes/default/layouts',
});

class AppServer {
  protected app: Express;
  protected http = null;

  constructor() {
    this.app = express();
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
      // middlewares: [TokenAuthMiddleware],
    });
  }

  listen(port: number) {
    this.appRoutes();
    this.app.listen(port, 'localhost', () => {
      DataSource.initialize();
      console.log(`server listening on: ${port}`);
    });
  }
}

new AppServer().listen(3000);
