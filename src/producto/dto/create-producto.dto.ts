import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  imagen?: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsUUID()
  proveedorId: string;

  @IsNumber()
  tipoBebidaId: number;

  @IsNumber()
  tamanioEnvaseId: number;

  @IsNumber()
  marcaId: number;
}
