import { NextFunction, Response } from 'express';
import * as Jwt from 'jwt-simple';
import { ExpressMiddlewareInterface, ForbiddenError, Middleware, UnauthorizedError } from 'routing-controllers';
import config from '../../config';
import { JwtTokenPayload, SESSION_TOKEN, TokenResponse, TokenType } from '../../app/services/auth-token.service';
import { IRequest } from '../../interfaces';

@Middleware({ type: 'before' })
export default class TokenMiddleware implements ExpressMiddlewareInterface {
  async use(req: IRequest, res: Response, next: NextFunction): Promise<void> {
    const g = req.originalUrl;
    const y = /^(\/backend|\/account)\/api(\/login|\/logout)/i.exec(req.path);
    if (/^(\/backend|\/account)\/api(\/login|\/logout)/i.exec(req.originalUrl)) {
      // allow all auth requests from mobile api except logout
      next();
    } else {
      const header = this.getHeader(req);
      if (!header) {
        next(new ForbiddenError());
      } else {
        const [type, jwt] = header.split(' ');
        if (type !== 'Bearer') {
          next(new ForbiddenError());
        } else {
          try {
            const token: JwtTokenPayload = Jwt.decode(
              jwt,
              config.jwt.secret,
              false,
              config.jwt.algorithm as Jwt.TAlgorithm
            );

            try {
              const id = Number(token.id);
              if (token.type === TokenType.Customer) {
                req.customerId = id;
              } else if (token.type === TokenType.User) {
                req.userId = id;
              }
              req.email = token.email;
              next();
            } catch (error) {
              console.log(
                `TokenAuthMiddleware error: ${error instanceof Error ? error.message : 'unknown error'}`,
                error
              );
              next(new UnauthorizedError('Unable to verify user'));
            }
          } catch (error) {
            console.log(`TokenAuthMiddleware warn: ${error instanceof Error ? error.message : 'unknown error'}`, error);
            next(new UnauthorizedError('Invalid Token'));
          }
        }
      }
    }
  }

  private getHeader(req: IRequest): string | null {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const cookie = req.signedCookies[SESSION_TOKEN] as TokenResponse;
    if (cookie) return `Bearer ${cookie.accessToken}`;
    return null;
  }
}
