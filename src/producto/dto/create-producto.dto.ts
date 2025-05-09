import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  proveedorId: string;

  @IsNumber()
  tipoBebidaId: number;

  @IsNumber()
  tamanioEnvaseId: number;

  @IsNumber()
  marcaId: number;
}
