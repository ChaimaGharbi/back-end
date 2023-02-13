import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { CommerçantModule } from './commerçant/commerçant.module';
import { ProduitModule } from './produit/produit.module';
import { CommandesModule } from './commandes/commandes.module';
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClientModule,
    CommerçantModule,
    ProduitModule,
    CommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
