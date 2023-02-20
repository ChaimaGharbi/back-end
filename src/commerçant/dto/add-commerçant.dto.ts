import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
  export class AddCommerçantDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    firstname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    mdp: string;
  
    @IsNotEmpty()
    @IsString()
    nom_du_service: string;
    @IsNotEmpty()
    @IsString()
    imgURL: string;
    @IsPhoneNumber()
    @IsNotEmpty()
    numTel: number;
  }