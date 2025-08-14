import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe, Query,
} from '@nestjs/common';
import { PartnerService } from '@/partner/partner.service';
import { CreatePartnerDto } from '@/partner/dto/create-partner.dto';
import { UpdatePartnerDto } from '@/partner/dto/update-partner.dto';
import { PartnerQueryDto } from '@/partner/dto/partner-query.dto';

@Controller('api/v1/partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  findAll(@Query() request: PartnerQueryDto) {
    return this.partnerService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partnerService.findOne(id);
  }

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partnerService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partnerService.remove(id);
  }
}
