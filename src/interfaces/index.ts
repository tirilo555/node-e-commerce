import * as Express from 'express';
export interface IRequest extends Express.Request {
  customerId?: number;
  userId?: number;
  email?: string;
}
