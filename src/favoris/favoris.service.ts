import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavorisEntity } from './entities/favoris.entity';
import { AddFavorisDto } from './dto/add-favoris.dto';
@Injectable()
export class FavorisService {
    constructor(
        @InjectRepository(FavorisEntity)
        private favorisRepository: Repository<FavorisEntity>,


    ) { }

    async add(favourite: AddFavorisDto): Promise<FavorisEntity> {
        return await this.favorisRepository.save(favourite);

    }
    async supp(id: number, produitid: number) {
        const favourite = await this.favorisRepository.findOne({
            where: { client_id: id, produit_id: produitid }
        });
        if (!favourite) {
            throw new NotFoundException("this product is not a favourite for this client or this product doesn't exist");
        }


        return (await this.favorisRepository.remove(favourite));
    }

}