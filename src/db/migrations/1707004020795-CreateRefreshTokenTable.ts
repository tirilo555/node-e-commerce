import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRefreshTokenTable1707004020795 implements MigrationInterface {
    name = "CreateRefreshTokenTable1707004020795";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, \`token\` varchar(100) NOT NULL DEFAULT '', \`userId\` int(11) UNSIGNED NULL, \`customerId\` int(11) UNSIGNED NULL, \`expires\` datetime NOT NULL, INDEX \`IDX_refresh_tokens_user_id\` (\`userId\`), INDEX \`IDX_refresh_tokens_customer_id\` (\`customerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_610102b60fea1455310ccd299de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_4fadc32acd39d2a16e14140ef4a\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_refresh_tokens_customer_id\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_refresh_tokens_user_id\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
    }
}
