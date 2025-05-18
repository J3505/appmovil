import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TamanioEnvaseService } from './tamanio-envase.service';
import { CreateTamanioEnvaseDto } from './dto/create-tamanio-envase.dto';
import { UpdateTamanioEnvaseDto } from './dto/update-tamanio-envase.dto';

@Controller('tamanioEnvase')
export class TamanioEnvaseController {
  constructor(private readonly tamanioEnvaseService: TamanioEnvaseService) {}

  @Post()
  create(@Body() createTamanioEnvaseDto: CreateTamanioEnvaseDto) {
    return this.tamanioEnvaseService.create(createTamanioEnvaseDto);
  }

  @Get()
  findAll() {
    return this.tamanioEnvaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tamanioEnvaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTamanioEnvaseDto: UpdateTamanioEnvaseDto) {
    return this.tamanioEnvaseService.update(+id, updateTamanioEnvaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tamanioEnvaseService.remove(+id);
  }
}
