import { Controller, Query } from "@nestjs/common";
import { CommerçantService } from './commerçant.service';
import { Body, Get, Post, Put, Param, Delete } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ProduitService } from 'src/produit/produit.service';
import { CommerçantEntity } from './entities/commerçant.entity';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { UpdateCommercantDto } from './dto/update-commerçant.dto';

@Controller('commercant')
export class CommerçantController {
  constructor(
    private produitService: ProduitService,
    private commercantService: CommerçantService,
  ) {}

  @Get('/:id/commandes')
  async getcommandes(@Param('id', ParseIntPipe) id: number) {
    const sql = await this.produitService.getProduitcommandee();

    sql.where(`commerçantCommerçantId = ${id}`);

    return sql.getMany();
  }
  @Delete('/:commerçant_id/deleteCommande/:produit_id/:client_id/')
  async deleteProduitFromCommande(
    @Param('commerçant_id') commerçant_id: number,
    @Param('produit_id') produit_id: number,
    @Param('client_id') client_id: number,
  ) {
    return await this.commercantService.deleteProduitFromCommandes(
      commerçant_id,
      produit_id,
      client_id,
    );
  }

  @Get()
  async getAllComs(): Promise<CommerçantEntity[]> {
    return await this.commercantService.getCommercant();
  }
  @Get('/:id')
  async getComById(@Param('id', ParseIntPipe) id): Promise<CommerçantEntity> {
    return await this.commercantService.getCommercantById(id);
  }
  @Post()
  async addCom(@Body() addComDto: AddCommerçantDto): Promise<CommerçantEntity> {
    return await this.commercantService.addCommercant(addComDto);
  }
  @Put('edit/:id')
  async updateCom(
    @Param('id', ParseIntPipe) id,
    @Body() newCom: UpdateCommercantDto,
  ): Promise<CommerçantEntity> {
    return await this.commercantService.updateCommercant(id, newCom);
  }
}
