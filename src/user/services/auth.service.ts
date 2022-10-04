import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthInfo } from '../user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(newUserInfo: AuthInfo) {
    const user = await this.userService.create(newUserInfo);
    const token = await this._createToken(user);
    return {
      username: user.username,
      token: token,
    };
  }

  async login(loginInfo: AuthInfo) {
    const user = await this.userService.findByLogin(loginInfo);
    const token = await this._createToken(user);

    return {
      username: user.username,
      token: token,
    };
  }

  private async _createToken({ username }) {
    const token = this.jwtService.sign(
      { username: username },
      { expiresIn: process.env.EXPIRESIN, secret: process.env.SECRETKEY },
    );
    return token;
  }

}
