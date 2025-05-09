import {
  Controller,
  Post,
  Put,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

interface UserRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateUser(@Body() dto: UpdateUserDto, @Req() req: UserRequest) {
    return this.authService.update(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: UserRequest) {
    return this.authService.changePassword(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response, @Req() req: UserRequest) {
    return this.authService.logout(res);
  }
}
