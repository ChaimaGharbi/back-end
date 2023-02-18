import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandesEntity } from './entities/commandes.entity';
import { AddCommandeDto } from './dto/add-commande.dto';
@Injectable()
export class CommandesService {
    constructor(
        @InjectRepository(CommandesEntity)
        private commandesRepository : Repository <CommandesEntity> ,
       
        
    ){}
   
    async add(commande:AddCommandeDto) : Promise<CommandesEntity>{
       return await this.commandesRepository.save(commande) ;

    }
  
}