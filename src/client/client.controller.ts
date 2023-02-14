import { Controller } from '@nestjs/common';
import { Body, Param, Get, Patch, Post } from '@nestjs/common/decorators';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Patch('update/:id')
  async updateClient(
    @Param('id', ParseIntPipe) id_Client: number,
    @Body() UpdateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientService.update(id_Client, UpdateClientDto);
  }
}
