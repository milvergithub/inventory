import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@/auth/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // password es opcional acá
}
