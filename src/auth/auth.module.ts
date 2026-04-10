import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
