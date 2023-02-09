import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { CommerçantEntity } from './entities/commerçant.entity';

@Injectable()
export class CommerçantService {
  constructor(
    @InjectRepository(CommerçantEntity)
    private commercantRepository: Repository<CommerçantEntity>,
  ) {}
  async getComs(): Promise<CommerçantEntity[]> {
    return await this.commercantRepository.find();
  }
  async getCommercantById(id: number): Promise<CommerçantEntity> {
    const com = await this.commercantRepository.findOne({ where: { commerçant_id: id } });
    if (!com) {
      throw new NotFoundException("ce commerçant n'existe pas");
    }
    return com;
  }
  async updateCom(id: number, newCom: Partial<AddCommerçantDto>) {
    const com = await this.getCommercantById(id);
    com.email = newCom.email ? newCom.email : com.email;
    com.address = newCom.address ? newCom.address : com.address;
    com.numTel = newCom.numTel ? newCom.numTel : com.numTel;

    return com;
  }
}
