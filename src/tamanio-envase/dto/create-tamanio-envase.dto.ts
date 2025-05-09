import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTamanioEnvaseDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
