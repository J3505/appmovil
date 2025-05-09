import { Module } from '@nestjs/common';
import { TipoBebidaService } from './tipo-bebida.service';
import { TipoBebidaController } from './tipo-bebida.controller';

@Module({
  controllers: [TipoBebidaController],
  providers: [TipoBebidaService],
})
export class TipoBebidaModule {}
