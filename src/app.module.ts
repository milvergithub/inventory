import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from '@/categories/category.module';
import { ProductModule } from '@/products/product.module';
import { UserModule } from '@/auth/user/user.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carga .env globalmente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(<string>config.get<string>('DB_PORT'), 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // solo para desarrollo
        ssl: {
          rejectUnauthorized: false, // permite certificados autofirmados
        },
      }),
    }),
    ProductModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
