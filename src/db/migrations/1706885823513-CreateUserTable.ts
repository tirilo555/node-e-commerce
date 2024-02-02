import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1706885823513 implements MigrationInterface {
    name = 'CreateUserTable1706885823513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, \`user_group_id\` int UNSIGNED NOT NULL DEFAULT '0', \`username\` varchar(255) NOT NULL DEFAULT '', \`password\` varchar(255) NOT NULL DEFAULT '', \`firstname\` varchar(255) NOT NULL DEFAULT '', \`lastname\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL DEFAULT '', \`image\` varchar(255) NOT NULL DEFAULT '', \`code\` varchar(255) NOT NULL DEFAULT '', \`ip\` varchar(255) NOT NULL DEFAULT '', \`status\` tinyint(1) NOT NULL DEFAULT '0', \`date_added\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
