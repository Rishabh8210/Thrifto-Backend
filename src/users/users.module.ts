import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { Wallets } from 'src/wallets/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Wallets])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService]
})
export class UsersModule {}
