import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LotQueryDto } from '@/lot/dto/lot-query.dto';
import { LotService } from '@/lot/lot.service';
import { CreateLotDto } from '@/lot/dto/create-lot.dto';
import { UpdateLotDto } from '@/lot/dto/update-lot.dto';

@Controller('lots')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Get()
  findAll(@Query() request: LotQueryDto) {
    return this.lotService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.findOne(id);
  }

  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotService.create(createLotDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    return this.lotService.update(id, updateLotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.remove(id);
  }
}
