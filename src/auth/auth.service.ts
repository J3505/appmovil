import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashPassword = await bcrypt.hash(dto.contrasenia, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        contrasenia: hashPassword,
        role: dto.role ?? 'CLIENTE',
      },
    });
    return user;
  }

  // async validateUser(correo: string, contrasenia: string) {
  //   const user = await this.prisma.user.findUnique({ where: { correo } });
  //   if (user && (await bcrypt.compare(contrasenia, user.contrasenia))) {
  //     const { contrasenia, ...result } = user;
  //     return result;
  //   }
  //   throw new UnauthorizedException('Credenciales inválidas');
  // }
  async validateUser(correo: string, contrasenia: string) {
    // 1. Buscar el usuario por correo
    const user = await this.prisma.user.findUnique({
      where: { correo },
    });

    // 2. Si no existe el usuario o la contraseña no coincide, lanzar error
    if (!user || !(await bcrypt.compare(contrasenia, user.contrasenia))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Retornar el usuario sin la contraseña
    const { contrasenia: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto, res: Response) {
    // 1. Buscar el usuario por correo
    const user = await this.prisma.user.findUnique({
      where: { correo: loginDto.correo },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.contrasenia,
      user.contrasenia,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar el token JWT
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1d' });

    // 4. Establecer la cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // true en producción
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    // 5. Retornar el usuario (sin la contraseña)
    const { contrasenia: _, ...userWithoutPassword } = user;
    return {
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
    };
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

  logout(res: Response) {
    res.clearCookie('token');
    return { message: 'Logout exitoso' };
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
