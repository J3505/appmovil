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
        proveedor: true,
        tipoBebida: true,
        tamanioEnvase: true,
        marca: true,
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
        proveedor: true,
        tipoBebida: true,
        tamanioEnvase: true,
        marca: true,
      },
    });
  }

  update(id: number, dto: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data: dto,
      include: {
        proveedor: true,
        tipoBebida: true,
        tamanioEnvase: true,
        marca: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
