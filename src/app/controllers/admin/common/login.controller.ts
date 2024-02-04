import { Request, Response } from 'express';
import { Post, JsonController, Req, Body, Res } from 'routing-controllers';
import LoginBodyDto from '../../../../app/dto/admin/login-body.dto';
import AdminLoginService, { LoginResponse } from '../../../../app/services/admin-login.service';
import AuthTokenService, {
  SESSION_TOKEN,
  SESSION_TOKEN_KEEP_SIGNIN,
} from '../../../../app/services/auth-token.service';
import config from '../../../../config';
import { ObjectLiteral } from '../../../../types';

@JsonController('/login')
export default class LoginController {
  @Post()
  async login(@Req() req: Request, @Res() res: Response, @Body() body: LoginBodyDto): Promise<ObjectLiteral> {
    const service = new AdminLoginService();
    const loginResponse: LoginResponse = await service.login(body);
    const tokenService = new AuthTokenService();
    const refreshExpiresAt = tokenService.refreshTokenExpiration(loginResponse.token.refreshToken) * 1000;
    const expires = body.keepSignIn && refreshExpiresAt ? new Date(refreshExpiresAt) : undefined;

    res.cookie(SESSION_TOKEN, loginResponse.token, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'lax',
      signed: true,
      expires,
      path: '/',
    });
    if (body.keepSignIn) {
      res.cookie(SESSION_TOKEN_KEEP_SIGNIN, 'true', {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: 'lax',
        expires,
        path: '/',
      });
    }

    return loginResponse.user;
  }
}
