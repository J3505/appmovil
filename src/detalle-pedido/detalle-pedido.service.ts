import { Injectable } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DetallePedidoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDetallePedidoDto, pedidoId: number) {
    return this.prisma.detallePedido.create({
      data: {
        pedido: {
          connect: {
            id: pedidoId,
          },
        },
        producto: {
          connect: {
            id: dto.productoId,
          },
        },
        cantidad: dto.cantidad,
        subtotal: dto.subtotal,
      },
    });
  }

  findAll() {
    return this.prisma.detallePedido.findMany();
  }

  findOne(id: number) {
    return this.prisma.detallePedido.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateDetallePedidoDto) {
    return this.prisma.detallePedido.update({
      where: { id },
      data: {
        productoId: dto.productoId,
        cantidad: dto.cantidad,
        subtotal: dto.subtotal,
      },
    });
  }

  remove(id: number) {
    return this.prisma.detallePedido.delete({ where: { id } });
  }
}
