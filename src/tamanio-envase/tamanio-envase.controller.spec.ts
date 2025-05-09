import { Test, TestingModule } from '@nestjs/testing';
import { TamanioEnvaseController } from './tamanio-envase.controller';
import { TamanioEnvaseService } from './tamanio-envase.service';

describe('TamanioEnvaseController', () => {
  let controller: TamanioEnvaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamanioEnvaseController],
      providers: [TamanioEnvaseService],
    }).compile();

    controller = module.get<TamanioEnvaseController>(TamanioEnvaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
