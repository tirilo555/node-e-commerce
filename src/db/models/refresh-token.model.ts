import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, Index } from 'typeorm';
import User from './user.model';
import CustomerModel from './customer.model';

@Entity('refresh_tokens')
export default class RefreshTokenModel {
  @PrimaryColumn({
    generated: 'increment',
    width: 11,
    unsigned: true,
  })
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    default: '',
  })
  token!: string;

  @Index('IDX_refresh_tokens_user_id')
  @Column({
    type: 'integer',
    unsigned: true,
    width: 11,
    default: null,
  })
  userId?: number;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user?: User;

  @Index('IDX_refresh_tokens_customer_id')
  @Column({
    type: 'integer',
    unsigned: true,
    width: 11,
    default: null,
  })
  customerId?: number;

  @ManyToOne(() => CustomerModel, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  customer?: CustomerModel;

  @Column({ type: 'datetime' })
  expires!: Date;
}
