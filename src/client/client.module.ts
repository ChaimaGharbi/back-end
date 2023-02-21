import { Module } from '@nestjs/common';
import { ProduitService } from 'src/produit/produit.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity';
import { ClientEntity } from './entities/client.entity';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { CommerçantEntity } from 'src/commerçant/entities/commerçant.entity';
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { CommandesService } from 'src/commandes/commandes.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { FavorisEntity } from "../favoris/entities/favoris.entity";
import { FavorisController } from "../favoris/favoris.controller";
import { FavorisService } from "../favoris/favoris.service";

@Module({
  imports:[TypeOrmModule.forFeature([ClientEntity,ProduitEntity,CommerçantEntity,CommandesEntity, FavorisEntity]),
  JwtModule.register({
    secret : 'this is e-commerce website'
  }),
  PassportModule.register({
    defaultStrategy: 'jwt'
  })],
  controllers: [ClientController, FavorisController],
  providers: [ClientService,ProduitService,CommerçantService, CommandesService,JwtStrategy, FavorisService]
})
export class ClientModule {}