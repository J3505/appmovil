import { Injectable } from '@nestjs/common';
import { CreateTamanioEnvaseDto } from './dto/create-tamanio-envase.dto';
import { UpdateTamanioEnvaseDto } from './dto/update-tamanio-envase.dto';

@Injectable()
export class TamanioEnvaseService {
  create(createTamanioEnvaseDto: CreateTamanioEnvaseDto) {
    return 'This action adds a new tamanioEnvase';
  }

  findAll() {
    return `This action returns all tamanioEnvase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tamanioEnvase`;
  }

  update(id: number, updateTamanioEnvaseDto: UpdateTamanioEnvaseDto) {
    return `This action updates a #${id} tamanioEnvase`;
  }

  remove(id: number) {
    return `This action removes a #${id} tamanioEnvase`;
  }
}
