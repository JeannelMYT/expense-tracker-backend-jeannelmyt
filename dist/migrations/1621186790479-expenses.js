"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenses1621186790479 = void 0;
class expenses1621186790479 {
    constructor() {
        this.name = 'expenses1621186790479';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(12) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `expense` (`id` int NOT NULL AUTO_INCREMENT, `expense` varchar(255) NOT NULL, `amount` int NOT NULL, `date` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `expense` ADD CONSTRAINT `FK_06e076479515578ab1933ab4375` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `expense` DROP FOREIGN KEY `FK_06e076479515578ab1933ab4375`");
        await queryRunner.query("DROP TABLE `expense`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }
}
exports.expenses1621186790479 = expenses1621186790479;
//# sourceMappingURL=1621186790479-expenses.js.map