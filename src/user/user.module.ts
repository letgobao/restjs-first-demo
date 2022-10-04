import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn:process.env.EXPIRESIN
      }
    })
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, UserRepository, JwtStrategy],
})
export class UserModule {}
