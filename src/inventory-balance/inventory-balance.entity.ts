import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from '@/partner/partner.entity';
import { Warehouse } from '@/warehouse/warehouse.entity';
import { Lot } from '@/lot/lot.entity';
import { Product } from '@/products/product.entity';

@Entity('inventory_balances')
@Unique(['partner', 'warehouse', 'product', 'lot'])
export class InventoryBalance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Partner, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @ManyToOne(() => Warehouse, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Lot, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lot_id' })
  lot: Lot;

  @Column('int', { default: 0 })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'bigint', nullable: true })
  created_by?: number;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'bigint', nullable: true })
  updated_by?: number;
}
