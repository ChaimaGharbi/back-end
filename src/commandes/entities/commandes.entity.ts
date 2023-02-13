import {
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    Column
  } from 'typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
  
  @Entity('commandes')
  export class CommandesEntity {
    @PrimaryColumn({ name: 'client_id' })
    client_id: number;
  
    @PrimaryColumn({ name: 'produit_id' })
    produit_id: number;
    
    @Column()
    status : string;

    @ManyToOne(
      () =>ClientEntity,
      client => client.commandes,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'client_id', referencedColumnName: 'client_id' }])
    clients: ClientEntity[];

    
  }