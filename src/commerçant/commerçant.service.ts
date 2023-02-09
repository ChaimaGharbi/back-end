import { Injectable, NotFoundException,  BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommerçantEntity } from './entities/commerçant.entity';
import { Repository } from 'typeorm';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CommerçantService {
  constructor(
    @InjectRepository(CommerçantEntity)
    private ComRepo: Repository<CommerçantEntity>,
  ) {}
  async getComs(): Promise<CommerçantEntity[]> {
    return await this.ComRepo.find();
  }
  async addCom(com: AddCommerçantDto): Promise<CommerçantEntity> {
    try {
      await validateOrReject(com);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const newCommerçant = {...com};
    return await this.ComRepo.save(newCommerçant);
  }
  async getComById(id: number): Promise<CommerçantEntity> {
    const com = await this.ComRepo.findOne({ where: { commerçant_id: id } });
    if (!com) {
      throw new NotFoundException("ce commerçant n'existe pas");
    }
    return com;
  }
  async updateCom(id: number, newCom: Partial<AddCommerçantDto>) {
    const com = await this.getComById(id);
    com.email = newCom.email ? newCom.email : com.email;
    com.address = newCom.address ? newCom.address : com.address;
    com.numTel = newCom.numTel ? newCom.numTel : com.numTel;

    return com;
  }
}
