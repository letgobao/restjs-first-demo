import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostRepository } from './repositories/post.repository';
import { PostModel } from './models/post.model';
import { CategoryModel } from './models/catogory.model';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryController } from './controllers/category.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostModel },
      { name: 'Category', schema: CategoryModel },
    ]),
  ],
  controllers: [PostController, CategoryController],
  providers: [PostService, PostRepository, CategoryRepository, CategoryService],
})
export class PostModule {}
