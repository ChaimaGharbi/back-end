import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitService } from 'src/produit/produit.service';
import { Repository } from 'typeorm';
import { CommerçantEntity } from './entities/commerçant.entity';

@Injectable()
export class CommerçantService {
    constructor(
        
        @InjectRepository(CommerçantEntity)
        private commercantRepository : Repository<CommerçantEntity>
        
    ){}


    async getCommercantById(id: number) : Promise<CommerçantEntity>{
        return await this.commercantRepository.findOne({where:{commerçant_id:id}});
    }


    




}
