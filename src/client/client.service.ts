import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { UsersubscribeDto } from './dto/user-subscribe.dto';
import * as bcrypt from 'bcrypt';
import { UserloginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class ClientService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private produit: Repository<ProduitEntity>,
  ) {}
  async find(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOneBy({ client_id: id });
  }
  async update(
    client_id: number,
    client: UpdateClientDto,
  ): Promise<ClientEntity> {
    const newclient = await this.clientRepository.preload({
      client_id,
      ...client,
    });
    return await this.clientRepository.save(newclient);
  }

  async addProductToFavourites(
    client: ClientEntity,
    produit: ProduitEntity,
  ): Promise<void> {
    if (!client) {
      throw new NotFoundException('client not found');
    }
    if (!produit) {
      throw new NotFoundException('product not found');
    }
    if (!Array.isArray(client.favoris)) {
      client.favoris = [];
    }
    console.log(client.favoris);
    client.favoris.push(produit);
    await this.clientRepository.save(client);
  }
  async getFavoritesList(id: number) {
    const client = await this.getClientById(id);
    if (!client) {
      throw new NotFoundException('client not found');
    }
    const qb = this.produit.createQueryBuilder('produit');
    qb.innerJoin('favoris', 'f', 'f.produit_id=produit.produit_id').where(
      `f.client_id = ${id}`,
    );
    return qb;
  }
  async getClientById(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOne({ where: { client_id: id } });
  }

  async register(userdata: UsersubscribeDto): Promise<ClientEntity> {
    const prev = await this.clientRepository.findOne({
      where: { email: userdata.email },
    });
    if (prev) {
      throw new ConflictException(
        'le user name et le password doivent etre unique',
      );
    }
    const user = this.clientRepository.create({ ...userdata });
    user.salt = await bcrypt.genSalt();
    user.mdp = await bcrypt.hash(user.mdp, user.salt);

    await this.clientRepository.save(user);

    return user;
  }

  async login(credentials: UserloginDto) {
    const { email, mdp } = credentials;
    const user = await this.clientRepository
      .createQueryBuilder('client')
      .where('client.email= :email', { email })
      .getOne();
    if (!user) {
      throw new NotFoundException('email ou mot de passe erroné');
    }
    const hashedPassword = await bcrypt.hash(mdp, user.salt);
    if (hashedPassword == user.mdp) {
      const payload = {
        email: user.email,
        client_id: user.client_id,
        adresse: user.adresse,
        numTel: user.numTel,
        name: user.name,
        firstname: user.firstname,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
        client_id: user.client_id,
      };
    } else {
      throw new NotFoundException('mot de passe erroné');
    }
  }
}
