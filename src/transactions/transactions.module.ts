import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallets } from 'src/wallets/entities/wallet.entity';
import { Transactions } from './entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallets, Transactions])],
})
export class TransactionsModule {}
