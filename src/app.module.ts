import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from './configs/server.config';
import typeormConfig from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { BcryptService } from './common/utils/bcrypt.service';
import { AuthModule } from './auth/auth.module';
import { WalletsModeule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, typeormConfig],
      envFilePath: '.env'
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [typeormConfig.KEY],
      useFactory: (config: ConfigType<typeof typeormConfig>) => (
        {
          ...config,
          autoLoadEntities: true,
        }
      )
    }),
    UsersModule,
    WalletsModeule,
    TransactionsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService],
})
export class AppModule {}
