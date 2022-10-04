import { CategoryRepository } from '../repositories/category.repository';
import { Category } from './../models/catogory.model';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostInfo } from '../post.dto';
import { User } from 'src/user/models/user.model';
@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createPost(user: User, postInfo: PostInfo) {
    postInfo.creator = user._id;
    const post = await this.postRepository.create(postInfo);
    if (postInfo.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: postInfo.categories },
        },
        {
          $push: {
            posts: post._id,
          },
        },
      );
    }
    return post;
  }

  async getAllPosts() {
    return await this.postRepository.findAll();
  }

  async likePost(id: string) {
    const post = await this.postRepository.findById(id);
    post.likes = post.likes + 1;
    return await this.postRepository.findByIdAndUpdate(id, {
      likes: post.likes,
    });
  }

  async deletePost(id: string) {
    return await this.postRepository.deleteOne(id);
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);

    if (post) {
      await post.populate({ path: 'creator', select: 'username' });
      return post;
    }

    return null;
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }
}
