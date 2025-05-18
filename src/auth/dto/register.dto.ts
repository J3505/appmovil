import { IsString, IsEmail } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsString()
  contrasenia: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsString()
  dni: string;

  role: Role = Role.CLIENTE;
}
