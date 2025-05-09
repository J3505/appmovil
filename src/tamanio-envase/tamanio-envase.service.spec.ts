import { Test, TestingModule } from '@nestjs/testing';
import { TamanioEnvaseService } from './tamanio-envase.service';

describe('TamanioEnvaseService', () => {
  let service: TamanioEnvaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TamanioEnvaseService],
    }).compile();

    service = module.get<TamanioEnvaseService>(TamanioEnvaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
