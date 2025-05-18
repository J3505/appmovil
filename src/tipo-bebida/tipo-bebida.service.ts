import { Injectable } from '@nestjs/common';
import { CreateTipoBebidaDto } from './dto/create-tipo-bebida.dto';
import { UpdateTipoBebidaDto } from './dto/update-tipo-bebida.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TipoBebidaService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTipoBebidaDto) {
    return this.prisma.tipoBebida.create({ data: data });
  }

  findAll() {
    return this.prisma.tipoBebida.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoBebida.findUnique({ where: { id } });
  }

  update(id: number, updateTipoBebidaDto: UpdateTipoBebidaDto) {
    return this.prisma.tipoBebida.update({
      where: { id },
      data: updateTipoBebidaDto,
    });
  }

  remove(id: number) {
    return this.prisma.tipoBebida.delete({ where: { id } });
  }
}
