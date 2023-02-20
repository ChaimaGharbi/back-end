import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavorisEntity } from './entities/favoris.entity';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [TypeOrmModule.forFeature([FavorisEntity])],
  controllers: [FavorisController],
  providers: [FavorisService,JwtService],
  exports:[FavorisService]

})
export class FavorisModule {}