import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from '@/partner/partner.entity';
import { PartnerService } from '@/partner/partner.service';
import { PartnerController } from '@/partner/partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnerService],
  controllers: [PartnerController],
  exports: [PartnerService],
})
export class PartnerModule {}
