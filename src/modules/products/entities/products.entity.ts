import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsInterface } from '../interfaces/products.interface';

@Entity({
  name: 'products',
})
export class ProductsEntity extends BaseEntity implements ProductsInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
    name: 'external_id',
  })
  externalId: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  title: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  brand: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  image: string;
  @Column({
    type: 'float',
    nullable: false,
  })
  price: number;
}
