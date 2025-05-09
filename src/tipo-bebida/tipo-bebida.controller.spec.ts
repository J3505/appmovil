import { Test, TestingModule } from '@nestjs/testing';
import { TipoBebidaController } from './tipo-bebida.controller';
import { TipoBebidaService } from './tipo-bebida.service';

describe('TipoBebidaController', () => {
  let controller: TipoBebidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoBebidaController],
      providers: [TipoBebidaService],
    }).compile();

    controller = module.get<TipoBebidaController>(TipoBebidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
