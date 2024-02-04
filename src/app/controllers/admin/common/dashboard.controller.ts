import dataSource from '../../../../db/data-source';
import UserModel from '../../../../db/models/user.model';
import { Get, JsonController, Req } from 'routing-controllers';
import { IRequest } from '../../../../interfaces';

@JsonController('/')
export default class DashboardController {
  @Get()
  async getHome(@Req() req: IRequest): Promise<{ title: string }> {
    const user = await dataSource.getRepository(UserModel).findAndCount();
    console.log(req);
    console.log(user);
    return { title: 'Home Page!' };
  }
}
