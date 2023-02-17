import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ClientService } from '../client.service';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private clientservice:ClientService,
    @InjectRepository(ClientEntity)
    private clinetRepository : Repository<ClientEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'this is e-commerce website'
    });
  }

  async validate(payload: any) {
    const user = await this.clinetRepository.findOne({where:{email:payload.email}});
    if (user){
      return { email: payload.email, id : payload.id };
    }else{
      throw new UnauthorizedException();
  }
}
}