import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { CommerçantEntity } from './entities/commerçant.entity';
import { UpdateCommercantDto } from './dto/update-commerçant.dto';
import { ClientEntity } from '../client/entities/client.entity';
import { ProduitEntity } from '../produit/entities/produit.entity';
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { stat } from 'fs';
import * as bcrypt from 'bcrypt';
import { UserloginDto } from 'src/client/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Param } from "@nestjs/common/decorators";
import { ParseIntPipe } from "@nestjs/common/pipes";

@Injectable()
export class CommerçantService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(CommerçantEntity)
    private commercantRepository: Repository<CommerçantEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
    @InjectRepository(CommandesEntity)
    private commandesRepository: Repository<CommandesEntity>,
  ) {}

  auth(authorization, id) {
    authorization = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(authorization);
    const commerçant_id = decoded.commerçant_id;
    if (commerçant_id != id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async getCommercant(): Promise<CommerçantEntity[]> {
    return await this.commercantRepository.find();
  }
  async getCommercantById(id: number): Promise<CommerçantEntity> {
    const com = await this.commercantRepository.findOne({
      where: { commerçant_id: id },
    });
    if (!com) {
      throw new NotFoundException("ce commerçant n'existe pas");
    }
    return com;
  }

  async register(comdata: AddCommerçantDto): Promise<CommerçantEntity> {
    const prev = await this.commercantRepository.findOne({
      where: { email: comdata.email },
    });
    if (prev) {
      throw new ConflictException("l'email et le password doivent etre unique");
    }
    const user = this.commercantRepository.create({ ...comdata });
    user.salt = await bcrypt.genSalt();
    user.mdp = await bcrypt.hash(user.mdp, user.salt);

    await this.commercantRepository.save(user);

    return user;
  }

  async login(credentials: UserloginDto) {
    const { email, mdp } = credentials;
    const user = await this.commercantRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('email ou mot de passe erroné');
    }
    const hashedPassword = await bcrypt.hash(mdp, user.salt);
    if (hashedPassword == user.mdp) {
      const payload = {
        email: user.email,
        name: user.name,
        firstname: user.firstname,
        imgURL: user.imgURL,
        commerçant_id: user.commerçant_id,
        nom_du_service: user.nom_du_service,
        numTel: user.numTel,
      };

      const jwt = this.jwtService.sign(payload);
      return {
        access_token: jwt,
        commerçant_id: user.commerçant_id,
      };
    } else {
      throw new NotFoundException('mot de passe erroné');
    }
  }

  async updateCommercant(id: number, newCom: UpdateCommercantDto) {
    const com = await this.commercantRepository.preload({
      commerçant_id: id,
      ...newCom,
    });
    return await this.commercantRepository.save(com);
  }

  async deleteProduitFromCommandes(
    client_id: number,
    produit_id: number,
  ) {
    const commande = await this.commandesRepository.findOne({
      where: { client_id, produit_id },
    });

    if (!commande) {
      throw new NotFoundException('client ou produit incorect');
    }
    const statu = 'rejetée';

    commande.status = statu;
    return await this.commandesRepository.save(commande);
  }
  async accepterCommandes(
    client_id: number,
    produit_id: number,
  ): Promise<CommandesEntity> {
    const commande = await this.commandesRepository.findOne({
      where: { client_id, produit_id },
    });

    if (!commande) {
      throw new NotFoundException('client ou produit incorect');
    }

    const statu = 'acceptée';

    commande.status = statu;
    return await this.commandesRepository.save(commande);
  }
  async getCommandesByCommercantId(commercant_id: number): Promise<CommandesEntity[]> {
    const commandes = await this.commandesRepository
      .createQueryBuilder('commande')
      .leftJoin('commande.produit', 'produit')
      .where('produit.commer\u00E7antCommer\u00E7antId = :commercant_id', {commercant_id})
      .getMany();
    return commandes;
  }
}
