import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerçantEntity } from '../entities/commerçant.entity';
import { CommerçantService } from '../commerçant.service';

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private commercantservice:CommerçantService,
    @InjectRepository(CommerçantEntity)
    private commercantRepository : Repository<CommerçantEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'this is e-commerce website'
    });
  }

  async validate(payload: any) {
    const user = await this.commercantRepository.findOne({where:{email:payload.email}});
    if (user){
      return { email: payload.email, id : payload.id };
    }else{
      throw new UnauthorizedException();
  }
}
}