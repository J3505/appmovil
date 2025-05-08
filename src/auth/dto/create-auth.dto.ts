import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  contrasenia: string;
}
