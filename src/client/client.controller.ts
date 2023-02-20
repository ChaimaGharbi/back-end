import { Controller, Get, Param, Put } from '@nestjs/common';
import { ProduitService } from 'src/produit/produit.service';
import { ClientService } from './client.service';
import { ParseIntPipe } from '@nestjs/common';
import { UsersubscribeDto } from './dto/user-subscribe.dto';
import { Delete, Post } from '@nestjs/common/decorators';
import { UserloginDto } from './dto/user-login.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtService } from '@nestjs/jwt/dist';
import { IsClientGuard } from './guards/isclient.guard';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { FavorisService } from 'src/favoris/favoris.service';

@Controller('client')

export class ClientController {
  constructor(
    private jwtService: JwtService,
    private produitService: ProduitService,
    private clientService: ClientService,
    private favorisService: FavorisService
  ) {}


  @UseGuards(JwtAuthGuard, IsClientGuard)
  @Get('commandes/:id') /** les commandes pour le client id */
  async getCommandes(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization,
  ) {
    authorization = authorization.split(' ')[1];
    console.log(authorization);
    const decoded = this.jwtService.verify(authorization);
    const clientid = decoded.client_id;
    if (clientid != id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const sql = await this.produitService.consultCommandeClient(id);
    return sql.getMany();
  }
  @UseGuards(JwtAuthGuard, IsClientGuard)
  @Post('favourites/:id/:produit') /** */
  async editListOfFavourites(
    @Param('id', ParseIntPipe) id: number,
    @Param('produit', ParseIntPipe) produitid: number,
    @Headers('authorization') authorization,
  ) {
    authorization = authorization.split(' ')[1];
    console.log(authorization);
    const decoded = this.jwtService.verify(authorization);
    const clientid = decoded.client_id;
    if (clientid != id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
     return await this.favorisService.add({client_id : id , produit_id : produitid});
  }
    @UseGuards(JwtAuthGuard, IsClientGuard)
  @Delete('favourites/:id/:produit') /** */
  async deleteOneOfFavourites(
    @Param('id', ParseIntPipe) id: number,
    @Param('produit', ParseIntPipe) produitid: number,
    @Headers('authorization') authorization,
  ) {
    authorization = authorization.split(' ')[1];
    console.log(authorization);
    const decoded = this.jwtService.verify(authorization);
    const clientid = decoded.client_id;
    if (clientid != id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
     return await this.favorisService.supp(id,produitid);
  }
  @UseGuards(JwtAuthGuard, IsClientGuard)
  @Get('favourites/:id')
  async getFavoris(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization,
  ) {
    authorization = authorization.split(' ')[1];
    console.log(authorization);
    const decoded = this.jwtService.verify(authorization);
    const clientid = decoded.client_id;
    if (clientid != id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const sql = await this.clientService.getFavoritesList(id);
    return sql.getMany();
  }

  @Post('/register')
  async register(@Body() userdata: UsersubscribeDto): Promise<ClientEntity> {
    return await this.clientService.register(userdata);
  }

  @Get('auth/login')
  async login(@Body() credentials: UserloginDto) {
    return await this.clientService.login(credentials);
  }
}