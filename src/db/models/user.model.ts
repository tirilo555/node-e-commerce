import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserModel {
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
  user_group_id?: number;

  @Column({
    type: 'varchar',
    width: 20,
    nullable: false,
    default: '',
  })
  username?: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    default: '',
  })
  password!: string;

  @Column({
    type: 'varchar',
    width: 32,
    nullable: false,
    default: '',
  })
  firstname!: string;

  @Column({
    type: 'varchar',
    width: 32,
    nullable: false,
    default: '',
  })
  lastname!: string;

  @Column({
    type: 'varchar',
    width: 96,
    nullable: false,
    default: '',
  })
  email!: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    default: '',
  })
  image?: string;

  @Column({
    type: 'varchar',
    width: 40,
    nullable: false,
    default: '',
  })
  code?: string;

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
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  date_added?: string;

  // 	'foreign' => [
  // 		[
  // 			'key'   => 'user_group_id',
  // 			'table' => 'user_group',
  // 			'field' => 'user_group_id'
  // 		]
  // 	],
}
