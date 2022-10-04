import { CategoryInfo } from './../category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostInfo } from '../post.dto';
import { User } from 'src/user/models/user.model';
@Injectable()
export class CategoryService {
  constructor(private readonly postRepository: PostRepository, private readonly categoryRepository: CategoryRepository) {}

  async getAll(){
    return await this.categoryRepository.findAll()
  }

  async create(categoryInfo: CategoryInfo) {
    return await this.categoryRepository.create(categoryInfo)
  }

  async getPosts(id: string) {
    return await this.postRepository.findByCondition({
        categories: {$elemMatch: {$eq: id}}
    })
  }

}
