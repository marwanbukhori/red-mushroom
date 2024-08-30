import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/jwt.strategy/jwt.strategy';
import { LocalStrategy } from './infrastructure/local.strategy/local.strategy';
import { AuthController } from './infrastructure/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
