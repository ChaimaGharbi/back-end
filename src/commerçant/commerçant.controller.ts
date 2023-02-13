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
    @Param('id', ParseIntPipe) id: number,
    @Body() newCom: UpdateCommercantDto,
  ): Promise<CommerçantEntity> {
    return await this.commercantService.updateCommercant(id, newCom);
  }


  @Put("/:produit_id/:client_id")
  async hh(

    @Param('produit_id', ParseIntPipe) produit_id: number,
    @Param('client_id', ParseIntPipe) client_id: number,
  ){
    
    return await this.commercantService.deleteProduitFromCommandes(
      client_id,
      produit_id,
    );
  }

  

}
