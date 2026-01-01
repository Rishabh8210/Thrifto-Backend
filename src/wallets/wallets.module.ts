import { Module } from "@nestjs/common";
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Wallets } from "./entities/wallet.entity";
import { Transactions } from "src/transactions/entities/transaction.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users, Wallets, Transactions])],
    controllers: [WalletsController],
    providers: [WalletsService]
})

export class WalletsModeule {}