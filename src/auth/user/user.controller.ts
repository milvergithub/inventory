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
import { UserService } from '@/auth/user/user.service';
import { CreateUserDto } from '@/auth/user/dto/create-user.dto';
import { UpdateUserDto } from '@/auth/user/dto/update-user.dto';
import { UserQueryDto } from '@/auth/user/dto/user-query.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() request: UserQueryDto) {
    return this.userService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
