import dataSource from '../../../../db/data-source';
import UserModel from '../../../../db/models/user.model';
import { Controller, Get, Render } from 'routing-controllers';

@Controller()
export default class HomeController {
  @Get('/')
  @Render('common/home')
  async getHome(): Promise<{ title: string }> {
    const user = await dataSource.getRepository(UserModel).findAndCount();
    console.log(user);
    return { title: 'Home Page!' };
  }
}
