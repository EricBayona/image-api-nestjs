import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, passaword: string) {
    const hash = await bcrypt.hash(passaword, 10);
    return this.userService.create(email, hash);
  }

  async login(email: string, passaword: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isMach = await bcrypt.compare(passaword, user.password);

    if (!isMach) throw new UnauthorizedException();

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}
