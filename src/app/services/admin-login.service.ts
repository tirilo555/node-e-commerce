import LoginBodyDto from '../dto/admin/login-body.dto';
import dataSource from '../../db/data-source';
import UserModel from '../../db/models/user.model';
import { BadRequestError } from 'routing-controllers';
import HashUtil from '../../utils/hash.utils';
import AuthTokenService, { JwtTokenPayload, TokenResponse, TokenType } from './auth-token.service';
import config from '../../config';
import moment from 'moment';
import { ObjectLiteral } from 'types';
import { instanceToPlain } from 'class-transformer';

export interface LoginResponse {
  token: TokenResponse;
  user: ObjectLiteral;
}

export default class AdminLoginService {
  async login(data: LoginBodyDto): Promise<LoginResponse> {
    let token: TokenResponse;
    let user: UserModel;
    try {
      user = await dataSource.getRepository(UserModel).findOneByOrFail({ email: data.email });
      if (!user || !(await HashUtil.compareHash(data.password, user.password, 'bcrypt'))) {
        throw new BadRequestError('Login or password is wrong!');
      }
      const tokenService = new AuthTokenService();
      const expiresIn = moment().add(config.jwt.accessTokenExpiryTime, 'seconds');
      const payload: JwtTokenPayload = {
        type: TokenType.User,
        exp: expiresIn.unix(),
        email: user.email,
        id: String(user?.id || 0),
      };
      token = await tokenService.generateToken(user, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }

    return { token, user: instanceToPlain(user) };
  }
}
