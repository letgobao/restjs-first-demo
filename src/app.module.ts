import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URL), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
