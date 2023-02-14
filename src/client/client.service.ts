import { Injectable } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}
  async find(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOneBy({ client_id: id });
  }
  async update(
    client_id: number,
    client: UpdateClientDto,
  ): Promise<ClientEntity> {
    const newclient = await this.clientRepository.preload({
      client_id,
      ...client,
    });
    return await this.clientRepository.save(newclient);
  }
}
