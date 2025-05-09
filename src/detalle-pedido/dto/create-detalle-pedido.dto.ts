import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetallePedidoDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  subtotal: number;

  @ValidateNested()
  @Type(() => Object)
  producto: {
    connect: {
      id: number;
    };
  };
}
