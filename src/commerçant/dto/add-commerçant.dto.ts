import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
  export class AddCommerçantDto {
    @IsString()
    @IsNotEmpty({
      message: 'Ce champs est obligatoire!',
    })
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
    address: string;
    
    @IsPhoneNumber()
    @IsNotEmpty()
    numTel: number;
  }