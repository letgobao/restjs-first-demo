import { UpdateInfo } from '../user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() info: UpdateInfo) {
    return this.userService.updateUser(id, info);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }

}
