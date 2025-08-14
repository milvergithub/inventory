import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '@/products/product.entity';

@Entity('lots')
export class Lot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: number;

  @Column({ length: 100 })
  lot_number: string;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @Column({ type: 'date', nullable: true })
  manufacture_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;
}
