import UserModel from '../../db/models/user.model';
import { randomUUID } from 'crypto';
import * as Jwt from 'jwt-simple';
import config from '../../config/index';
import RefreshTokenModel from '../../db/models/refresh-token.model';
import dataSource from '../../db/data-source';
import moment from 'moment';
import CustomerModel from '../../db/models/customer.model';
import { Not } from 'typeorm';

export const SESSION_TOKEN = 'session.token';
export const SESSION_TOKEN_KEEP_SIGNIN = 'session.token.keep.signin';
export const DESKTOP_USER_AGENT = 'Mozilla/5.0';

export interface TokenResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export enum TokenType {
  User = 'user',
  Customer = 'customer',
}

export interface JwtTokenPayload {
  type: TokenType;
  exp: number;
  email: string;
  id: string;
}

export default class AuthTokenService {
  async generateToken(user: UserModel | CustomerModel, payload: JwtTokenPayload): Promise<TokenResponse> {
    const tokenType = 'Bearer';
    const accessToken = Jwt.encode(payload, config.jwt.secret, config.jwt.algorithm as Jwt.TAlgorithm);
    let encodedRefreshToken: string = '';
    let newestToken: RefreshTokenModel | undefined;

    await dataSource.transaction(async manager => {
      const repo = manager.getRepository(RefreshTokenModel);
      const refreshid = randomUUID();
      const expires = moment().add(config.jwt.refreshTokenExpiryTime, 'seconds');
      encodedRefreshToken = Jwt.encode(
        {
          type: payload.type,
          email: user.email,
          jti: refreshid,
          exp: expires.unix(),
          id: String(user.id),
        },
        config.jwt.secret,
        config.jwt.algorithm as Jwt.TAlgorithm
      );
      const refreshToken = repo.create({
        token: refreshid,
        expires: expires.toDate(),
      });
      if (user instanceof UserModel && user.id !== 0) refreshToken.user = user;
      else if (user instanceof CustomerModel) refreshToken.customer = user;
      newestToken = await repo.save(refreshToken);
    });

    if (user && newestToken !== undefined) {
      void dataSource
        .getRepository(RefreshTokenModel)
        .delete(
          user instanceof UserModel
            ? { id: Not(Number(newestToken.id)), userId: user.id }
            : { id: Not(newestToken.id), userId: user.id }
        )
        .catch(error => {
          if (error instanceof Error) console.log(error); // logger.error(`Tokens removal failed! Error: ${error.message}`);
        });
    }

    const expiresSeconds = config.jwt.accessTokenExpiryTime;
    return { tokenType, accessToken, refreshToken: encodedRefreshToken, expiresIn: expiresSeconds };
  }

  public refreshTokenExpiration(refreshToken: string): number {
    const decoded: JwtTokenPayload = Jwt.decode(
      refreshToken,
      config.jwt.secret,
      false,
      config.jwt.algorithm as Jwt.TAlgorithm
    );
    return decoded?.exp || 0;
  }
}
