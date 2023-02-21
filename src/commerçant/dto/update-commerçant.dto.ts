import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
  export class UpdateCommercantDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsStrongPassword()
    mdp: string;

    @IsOptional()
    @IsString()
    nom_du_service: string;
    @IsOptional()
    @IsString()
    imgURL: string;
    @IsPhoneNumber()
    @IsNotEmpty()
    numTel: number;
  }