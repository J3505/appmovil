import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.contrasenia, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        contrasenia: hashPassword,
      },
    });
    return user;
  }

  async login(dto: CreateAuthDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        correo: dto.correo,
      },
    });
    if (!user) {
      throw new Error('El correo no existe');
    }
    const isMatch = await bcrypt.compare(dto.contrasenia, user.contrasenia);
    if (!isMatch) {
      throw new Error('Credenciales invalidas');
    }
    const token = this.jwtService.sign(
      {
        sub: user.id,
        role: user.role,
      },
      {
        expiresIn: '1d',
      },
    );
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      //cambiar a tru en produccion
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: 'Login exitoso' };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.contrasenia);
    if (!isMatch)
      throw new UnauthorizedException('Contraseña actual incorrecta');

    const newHashed = await bcrypt.hash(dto.newPassword, 10);
    return this.prisma.user.update({
      where: { id },
      data: { contrasenia: newHashed },
    });
  }

  async logout(res: Response) {
    res.clearCookie('token');
    return { message: 'Logout exitoso' };
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
