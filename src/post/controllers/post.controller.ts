import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
  Req,
  Query
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostInfo } from '../post.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any, @Body() postInfo: PostInfo) {
    return this.postService.createPost(req.user, postInfo);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Put(':id')
  async likePost(@Param('id') id: string) {
    return this.postService.likePost(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user/all')
  async getUserPosts(@Req() req: any) {
    await req.user.populate('posts');
    return req.user.posts;
  }
  @Get('get/categories')
  async getCategoriesPosts(@Query('category_ids')  category_ids: [string]) {
    return this.postService.getByCategories(category_ids)
  }
}
