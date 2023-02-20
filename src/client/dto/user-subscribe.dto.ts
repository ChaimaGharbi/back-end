import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ProduitEntity } from '../../produit/entities/produit.entity';
import { Column } from 'typeorm';

export class UsersubscribeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mdp: string;

  @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsNotEmpty()
  @IsNumber()
  numTel: number;
  @IsOptional()
  favoris: ProduitEntity[];
}
