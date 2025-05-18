import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(dto: CreatePedidoDto, clienteId: string) {
  //   let total = 0;
  //   const detalles = await Promise.all(
  //     dto.detalles.map(async (detalle) => {
  //       const producto = await this.prisma.producto.findUnique({
  //         where: {
  //           id: detalle.productoId,
  //         },
  //       });
  //       const subtotal = (producto?.precio || 0) * detalle.cantidad;
  //       total += subtotal;
  //       return { ...detalle, subtotal };
  //     }),
  //   );
  //   return this.prisma.pedido.create({
  //     data: {
  //       clienteId,
  //       total,
  //       estado: 'PENDIENTE',
  //       detalles: { create: detalles },
  //     },
  //     include: {
  //       detalles: true,
  //       cliente: true,
  //     },
  //   });
  // }

  async create(dto: CreatePedidoDto) {
    const { detalles, ...pedidoData } = dto;

    return this.prisma.pedido.create({
      data: {
        ...pedidoData,
        detalles: {
          create: detalles.map((detalle) => ({
            ...detalle,
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
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  update(id: number, data: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...data,
        detalles: {
          deleteMany: {},
          create: data.detalles?.map((detalle) => ({
            ...detalle,
          })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
