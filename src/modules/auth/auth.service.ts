import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, type: user.type };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(userId: string): Promise<any> {
    return this.usersService.findOne(userId);
  }
}
