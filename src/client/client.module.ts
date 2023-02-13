import { Module } from '@nestjs/common';
import { ProduitService } from 'src/produit/produit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

import { ProduitEntity } from 'src/produit/entities/produit.entity';
import { ClientEntity } from './entities/client.entity';


@Module({
  imports:[TypeOrmModule.forFeature([ClientEntity,ProduitEntity])],
  controllers: [ClientController],
  providers: [ClientService,ProduitService]
})
export class ClientModule {}