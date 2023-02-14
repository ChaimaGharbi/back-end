import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandesEntity } from './entities/commandes.entity';

@Controller('commandes')
export class CommandesController {
    constructor(
        @InjectRepository(CommandesEntity)
    private commandesRepository :Repository<CommandesEntity>
    ){}


    @Get() /** */
    async get(){
        return await this.commandesRepository.find();
    }
}

@Controller('commandes')
export class CommandesController {}