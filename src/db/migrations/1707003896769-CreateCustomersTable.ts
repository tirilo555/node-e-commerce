import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomersTable1707003896769 implements MigrationInterface {
    name = "CreateCustomersTable1707003896769";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, \`customer_group_id\` int(11) UNSIGNED NOT NULL DEFAULT '0', \`store_id\` int(11) UNSIGNED NOT NULL DEFAULT '0', \`language_id\` int(11) UNSIGNED NOT NULL, \`firstname\` varchar(255) NOT NULL DEFAULT '', \`lastname\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL DEFAULT '', \`telephone\` varchar(255) NOT NULL DEFAULT '', \`password\` varchar(255) NOT NULL DEFAULT '', \`custom_field\` text NOT NULL DEFAULT '', \`newsletter\` tinyint(1) NOT NULL DEFAULT '0', \`ip\` varchar(255) NOT NULL DEFAULT '', \`status\` tinyint(1) NOT NULL DEFAULT '0', \`safe\` tinyint(1) NOT NULL DEFAULT '0', \`token\` text NOT NULL DEFAULT '', \`code\` varchar(255) NOT NULL DEFAULT '', \`date_added\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customers\``);
    }
}
