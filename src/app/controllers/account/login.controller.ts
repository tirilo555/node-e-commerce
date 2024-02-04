import LoginBodyDto from '../../../app/dto/admin/login-body.dto';
import { LoginResponse } from '../../../app/services/admin-login.service';
import { TokenResponse } from '../../../app/services/auth-token.service';
import { IRequest } from 'interfaces';
import { Body, JsonController, Post, Req } from 'routing-controllers';

@JsonController('/')
export default class LoginController {
  @Post()
  async login(@Req() req: IRequest, @Body() body: LoginBodyDto): Promise<LoginResponse> {
    let token: TokenResponse = { tokenType: '', accessToken: '', refreshToken: '', expiresIn: 0 };

    return { token, user: {} };
  }
}
