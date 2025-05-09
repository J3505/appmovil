import { Module } from '@nestjs/common';
import { TamanioEnvaseService } from './tamanio-envase.service';
import { TamanioEnvaseController } from './tamanio-envase.controller';

@Module({
  controllers: [TamanioEnvaseController],
  providers: [TamanioEnvaseService],
})
export class TamanioEnvaseModule {}
