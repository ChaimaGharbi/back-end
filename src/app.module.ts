import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { CommerçantModule } from './commerçant/commerçant.module';
import { ProduitModule } from './produit/produit.module';
import { FavorisModule } from './favoris/favoris.module';
import * as dotenv from "dotenv";
import * as process from "process";
import { ProduitEntity } from './produit/entities/produit.entity';
import { CommandesEntity } from './commandes/entities/commandes.entity';
import { CommerçantEntity } from './commerçant/entities/commerçant.entity';
import { ClientEntity } from './client/entities/client.entity';

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
      entities: [ProduitEntity,CommandesEntity,CommerçantEntity,ClientEntity],
      synchronize: true,
    }),
    ClientModule,
    CommerçantModule,
    ProduitModule,
    FavorisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
