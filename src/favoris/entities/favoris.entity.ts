import { Entity, JoinColumn, PrimaryColumn, ManyToMany } from 'typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';

@Entity('favoris')
export class FavorisEntity {
  @PrimaryColumn({ name: 'client_id' })
  client_id: number;

  @PrimaryColumn({ name: 'produit_id' })
  produit_id: number;
}