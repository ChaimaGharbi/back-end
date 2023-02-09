import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository : Repository<ClientEntity>
    ){}

}
