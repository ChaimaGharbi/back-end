import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerçantEntity } from 'src/commerçant/entities/commerçant.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { ClientEntity } from '../client/entities/client.entity';
import { ClientService } from '../client/client.service';
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { CommandesModule } from 'src/commandes/commandes.module';
import { ClientModule } from 'src/client/client.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProduitEntity,
      CommerçantEntity,
      ClientEntity,
      CommandesEntity,
    ]),
    ClientModule,
    CommandesModule,
    JwtModule.register({
      secret: 'this is e-commerce website',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [ProduitController],
  providers: [ProduitService, CommerçantService, ClientService],
})
export class ProduitModule {}
