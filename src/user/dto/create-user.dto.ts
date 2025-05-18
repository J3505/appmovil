import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  @Length(8, 8, { message: 'El DNI debe tener al menos 8 caracteres' })
  dni: string;

  @IsEmail()
  correo: string;

  @Length(6, 100, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  })
  contrasenia: string;

  @IsEnum(Role)
  role: Role;
}
