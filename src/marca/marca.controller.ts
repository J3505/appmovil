import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() dto: CreateMarcaDto) {
    return this.marcaService.create(dto);
  }

  @Get()
  findAll() {
    return this.marcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMarcaDto) {
    return this.marcaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcaService.remove(+id);
  }
}
