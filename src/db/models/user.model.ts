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
  password?: string;

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
  status?: string;

  @Column({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  date_added?: string;

  // 'name' => 'user',
  // 	'field' => [
  // 		[
  // 			'name' => 'user_id',
  // 			'type' => 'int(11)',
  // 			'not_null' => true,
  // 			'auto_increment' => true
  // 		],
  // 		[
  // 			'name' => 'user_group_id',
  // 			'type' => 'int(11)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'username',
  // 			'type' => 'varchar(20)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'password',
  // 			'type' => 'varchar(255)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'firstname',
  // 			'type' => 'varchar(32)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'lastname',
  // 			'type' => 'varchar(32)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'email',
  // 			'type' => 'varchar(96)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'image',
  // 			'type' => 'varchar(255)',
  // 			'not_null' => true,
  // 			'default' => ''
  // 		],
  // 		[
  // 			'name' => 'code',
  // 			'type' => 'varchar(40)',
  // 			'not_null' => true,
  // 			'default' => ''
  // 		],
  // 		[
  // 			'name' => 'ip',
  // 			'type' => 'varchar(40)',
  // 			'not_null' => true,
  // 			'default' => ''
  // 		],
  // 		[
  // 			'name' => 'status',
  // 			'type' => 'tinyint(1)',
  // 			'not_null' => true
  // 		],
  // 		[
  // 			'name' => 'date_added',
  // 			'type' => 'datetime',
  // 			'not_null' => true
  // 		]
  // 	],
  // 	'primary' => [
  // 		'user_id'
  // 	],
  // 	'foreign' => [
  // 		[
  // 			'key'   => 'user_group_id',
  // 			'table' => 'user_group',
  // 			'field' => 'user_group_id'
  // 		]
  // 	],
}
