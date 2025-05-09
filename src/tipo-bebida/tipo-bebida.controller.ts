import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoBebidaService } from './tipo-bebida.service';
import { CreateTipoBebidaDto } from './dto/create-tipo-bebida.dto';
import { UpdateTipoBebidaDto } from './dto/update-tipo-bebida.dto';

@Controller('tipo-bebida')
export class TipoBebidaController {
  constructor(private readonly tipoBebidaService: TipoBebidaService) {}

  @Post()
  create(@Body() dto: CreateTipoBebidaDto) {
    return this.tipoBebidaService.create(dto);
  }

  @Get()
  findAll() {
    return this.tipoBebidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoBebidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTipoBebidaDto) {
    return this.tipoBebidaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoBebidaService.remove(+id);
  }
}
