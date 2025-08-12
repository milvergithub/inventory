import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/auth/user/user.entity';
import { UserService } from '@/auth/user/user.service';
import { UserController } from '@/auth/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class AuthModule {}
