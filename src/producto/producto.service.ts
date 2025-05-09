import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductoDto) {
    return this.prisma.producto.create({ data: dto });
  }

  findAll() {
    return this.prisma.producto.findMany({
      include: {
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tipoBebida: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tamanioEnvase: {
          select: {
            id: true,
            nombre: true,
          },
        },
        marca: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.producto.findUnique({
      where: { id },
      include: {
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tipoBebida: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tamanioEnvase: {
          select: {
            id: true,
            nombre: true,
          },
        },
        marca: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
  }

  update(id: number, dto: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data: dto,
      include: {
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tipoBebida: {
          select: {
            id: true,
            nombre: true,
          },
        },
        tamanioEnvase: {
          select: {
            id: true,
            nombre: true,
          },
        },
        marca: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
