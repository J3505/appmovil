import { Injectable } from '@nestjs/common';
import { CreateTamanioEnvaseDto } from './dto/create-tamanio-envase.dto';
import { UpdateTamanioEnvaseDto } from './dto/update-tamanio-envase.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TamanioEnvaseService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateTamanioEnvaseDto) {
    return this.prisma.tamanioEnvase.create({ data });
  }

  findAll() {
    return this.prisma.tamanioEnvase.findMany();
  }

  findOne(id: number) {
    return this.prisma.tamanioEnvase.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateTamanioEnvaseDto) {
    return this.prisma.tamanioEnvase.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.tamanioEnvase.delete({ where: { id } });
  }
}
