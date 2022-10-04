import { Controller, Get, Post, Delete, Param, Body, Put, UseGuards, Req } from '@nestjs/common';
import { PostInfo } from '../post.dto';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from '../services/category.service';
import { CategoryInfo } from '../category.dto';
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllCategories() {
        return this.categoryService.getAll()
    }

    @Post() 
    async createCategory( categoryInfo: CategoryInfo) {
        return this.categoryService.create(categoryInfo)
    }
    @Get(':id')
    async getCategoryPosts(@Param('id') id:string) {
        return this.categoryService.getPosts(id)
    }

}