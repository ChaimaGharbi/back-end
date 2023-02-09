import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CommerçantService } from './commerçant.service';
import { CommerçantEntity } from './entities/commerçant.entity';
import { AddCommerçantDto } from './dto/add-commerçant.dto';

@Controller('commercant')
export class CommerçantController {
  constructor(private ComService: CommerçantService) {}
  @Get()
  async getAllComs(): Promise<CommerçantEntity[]> {
    return await this.ComService.getComs();
  }
  @Get('/:id')
  async getComById(@Param('id', ParseIntPipe) id): Promise<CommerçantEntity> {
    return await this.ComService.getComById(id);
  }

  @Post()
  async addCom(@Body() addComDto: AddCommerçantDto): Promise<CommerçantEntity> {
    return await this.ComService.addCom(addComDto);
  }
}
