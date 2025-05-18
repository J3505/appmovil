import {
  IsUUID,
  IsEnum,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  ENVIADO = 'ENVIADO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO',
}

class DetalleDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;
}

export class CreatePedidoDto {
  @IsUUID()
  clienteId: string;

  @IsNumber()
  total: number;

  @IsEnum(EstadoPedido)
  estado: EstadoPedido;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  detalles: DetalleDto[];
}
