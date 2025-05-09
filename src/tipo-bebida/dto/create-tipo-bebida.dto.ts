import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoBebidaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
