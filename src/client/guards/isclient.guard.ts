import { Injectable } from "@nestjs/common/decorators";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt/dist';
import { ClientService } from "../client.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientEntity } from "../entities/client.entity";



@Injectable()
export class IsClientGuard implements CanActivate{
    constructor(
        private jwtService :JwtService,){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        

        const request =context.switchToHttp().getRequest();
        const authorization=request.rawHeaders[1].split(' ')[1]
        const decoded = this.jwtService.verify(authorization);
        
        if (!decoded.client_id){
            return false
        } 

        return true;
    }
}