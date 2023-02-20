import { Controller, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CommerçantService } from './commerçant.service';
import {
  Body,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Patch,
  UseGuards,
  Headers,
} from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ProduitService } from 'src/produit/produit.service';
import { CommerçantEntity } from './entities/commerçant.entity';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { UpdateCommercantDto } from './dto/update-commerçant.dto';
import { JwtAuthGuard } from './guards/jwt-authcommercant.gards';
import { commercantLoginDto } from './dto/connercant-login.dto';
import { IsCommercantGuard } from './guards/iscommercant.guard';
import { JwtService } from '@nestjs/jwt';
import { Req } from "@nestjs/common/decorators/http/route-params.decorator";

@Controller('commercant')
export class CommerçantController {
  constructor(
    private jwtService: JwtService,
    private produitService: ProduitService,
    private commercantService: CommerçantService,
  ) {}

  @Post('auth/login')
  async log(@Body() credentials: commercantLoginDto) {
    return await this.commercantService.login(credentials);
  }

  //@UseGuards(JwtAuthGuard, IsCommercantGuard)
  /*@Get('/:id/commandes') 
  async getcommandes(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization,
  ) {
    this.commercantService.auth(authorization, id);
    const sql = await this.produitService.getProduitcommandee();

    sql.where(`commerçantCommerçantId = ${id}`);

    return sql.getMany();
  }*/

  /**@Get() /**  async getAllComs(): Promise<CommerçantEntity[]> {
    return await this.commercantService.getCommercant();
  }*/

  @UseGuards(JwtAuthGuard, IsCommercantGuard)
  @Get('/:id') /** */ async getComById(
    @Param('id', ParseIntPipe) id,
    @Headers('Authorization') authorization,
    @Req() req
  ): Promise<CommerçantEntity> {
    console.log(req);
    console.log(authorization);
    return await this.commercantService.getCommercantById(id);
  }

  @Post('register') /** */ async addCom(
    @Body() addComDto: AddCommerçantDto,
  ): Promise<CommerçantEntity> {
    return await this.commercantService.register(addComDto);
  }

  // @UseGuards(JwtAuthGuard, IsCommercantGuard)
  @Put('edit/:id') /** */ async updateCom(
    @Param('id', ParseIntPipe) id: number,
    @Body() newCom: UpdateCommercantDto,
    //@Headers('authorization') authorization,
  ): Promise<CommerçantEntity> {
    //this.commercantService.auth(authorization, id);
    return await this.commercantService.updateCommercant(id, newCom);
  }

  //@UseGuards(JwtAuthGuard, IsCommercantGuard)
  @Patch('delete/:id/:produit_id/:client_id') /** */ async deleteCommande(
    @Param('id', ParseIntPipe) id: number,
    @Param('produit_id', ParseIntPipe) produit_id: number,
    @Param('client_id', ParseIntPipe) client_id: number,
    @Headers('authorization') authorization,
  ) {
    //this.commercantService.auth(authorization, id);
    return await this.commercantService.deleteProduitFromCommandes(
      client_id,
      produit_id,
    );
  }

  //@UseGuards(JwtAuthGuard, IsCommercantGuard)
  @Patch('accepte/:id/:produit_id/:client_id') /** */ async accepteCommande(
    @Param('id', ParseIntPipe) id: number,
    @Param('produit_id', ParseIntPipe) produit_id: number,
    @Param('client_id', ParseIntPipe) client_id: number,
    @Headers('authorization') authorization,
  ) {
    //this.commercantService.auth(authorization, id);
    return await this.commercantService.accepterCommandes(
      client_id,
      produit_id,
    );
  }
  @Get('/:id/commandes')
  async getcommandes(@Param('id', ParseIntPipe) id: number) {
    return await this.commercantService.getCommandesByCommercantId(id);
  }
}
