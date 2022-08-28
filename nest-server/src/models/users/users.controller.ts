import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/services/users.service';
import { UserRegisterDto } from './dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/register')
  getById(@Body() body: UserRegisterDto) {
    return this.userService.registerUser(body);
  }

  @Post('/login')
  login(@Body() body: UserRegisterDto) {
    return this.userService.login(body);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  get(@Req() { user }: { user: User }) {
    return user;
  }
}
