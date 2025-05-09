import { EstadoPedido } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetallePedidoDto } from 'src/detalle-pedido/dto/create-detalle-pedido.dto';

export class CreatePedidoDto {
  @IsUUID()
  clienteId: string;

  @IsNumber()
  total: number;

  @IsEnum(EstadoPedido)
  estado: EstadoPedido;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetallePedidoDto)
  detalles: CreateDetallePedidoDto[];
}
