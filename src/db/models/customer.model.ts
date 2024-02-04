import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'customers' })
export default class CustomerModel {
  @PrimaryColumn({
    generated: 'increment',
    width: 11,
    unsigned: true,
  })
  id?: number;

  @Column({
    type: 'integer',
    width: 11,
    unsigned: true,
    nullable: false,
    default: 0,
  })
  customer_group_id!: number;

  @Column({
    type: 'integer',
    width: 11,
    unsigned: true,
    nullable: false,
    default: 0,
  })
  store_id!: number;

  @Column({
    type: 'integer',
    width: 11,
    unsigned: true,
    nullable: false,
  })
  language_id!: number;

  @Column({
    type: 'varchar',
    width: 32,
    nullable: false,
    default: '',
  })
  firstname?: string;

  @Column({
    type: 'varchar',
    width: 32,
    nullable: false,
    default: '',
  })
  lastname?: string;

  @Column({
    type: 'varchar',
    width: 96,
    nullable: false,
    default: '',
  })
  email?: string;

  @Column({
    type: 'varchar',
    width: 32,
    nullable: false,
    default: '',
  })
  telephone?: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    default: '',
  })
  password?: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  custom_field?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  newsletter?: boolean;

  @Column({
    type: 'varchar',
    width: 40,
    nullable: false,
    default: '',
  })
  ip?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  status?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  safe?: boolean;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  token?: string;

  @Column({
    type: 'varchar',
    width: 40,
    nullable: false,
    default: '',
  })
  code?: string;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  date_added?: string;
}
