import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerçantEntity } from 'src/commerçant/entities/commerçant.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { ClientEntity } from "../client/entities/client.entity";
import { ClientService } from "../client/client.service";
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from './entities/produit.entity';
import { CommandesModule } from 'src/commandes/commandes.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity,CommerçantEntity, ClientEntity, CommandesEntity]),  , ClientModule , CommandesModule ],
  controllers: [ProduitController],
  providers: [ProduitService,CommerçantService,ClientService],
})
export class ProduitModule { }