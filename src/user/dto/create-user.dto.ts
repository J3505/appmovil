import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  apellido: string;

  @IsString()
  @IsOptional()
  telefono: string;

  @IsString()
  @IsOptional()
  direccion: string;

  @IsNotEmpty()
  dni: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  contrasenia: string;

  @IsEnum(Role)
  role: Role;
}
