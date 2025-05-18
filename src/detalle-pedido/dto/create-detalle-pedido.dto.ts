import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsNumber()
  pedidoId: number;

  @IsNumber()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;
}
