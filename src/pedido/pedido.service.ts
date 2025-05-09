import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePedidoDto) {
    return this.prisma.pedido.create({
      data: {
        clienteId: dto.clienteId,
        total: dto.total,
        estado: dto.estado,
        detalles: {
          create: dto.detalles.map((detalle) => ({
            productoId: detalle.productoId,
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal,
            producto: {
              connect: {
                id: detalle.productoId,
              },
            },
          })),
        },
      },
      include: {
        detalles: true,
      },
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        detalles: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: {
        clienteId: dto.clienteId,
        total: dto.total,
        estado: dto.estado,
      },
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({ where: { id } });
  }
}
