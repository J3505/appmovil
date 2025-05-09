import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MarcaService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMarcaDto) {
    return this.prisma.marca.create({ data: dto });
  }

  findAll() {
    return this.prisma.marca.findMany();
  }

  findOne(id: number) {
    return this.prisma.marca.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateMarcaDto) {
    return this.prisma.marca.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.marca.delete({ where: { id } });
  }
}
