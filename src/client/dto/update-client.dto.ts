import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ProduitEntity } from 'src/produit/entities/produit.entity';

export class UpdateClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mdp: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsNumber()
  numTel: number;

  @IsOptional()
  commandes: ProduitEntity[];
}
