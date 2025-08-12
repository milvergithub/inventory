import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from '@/partner/partner.entity';

@Entity({ schema: 'public', name: 'warehouses' })
export class Warehouse {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Partner, (partner) => partner.warehouses, {
    onDelete: 'CASCADE',
  })
  partner: Partner;

  @Column({ name: 'partner_id' })
  partnerId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  location?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'bigint', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'bigint', nullable: true })
  updatedBy: number | null;
}
