import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class updateProduitDto {
    @IsString()
    @IsOptional()
    nom: string;
  
    @IsString()
    @IsOptional()
    imgURL: string;
  
    @IsString()
    @IsOptional()
    description: string;
  
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    prix: number;
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    stock: number;
  }