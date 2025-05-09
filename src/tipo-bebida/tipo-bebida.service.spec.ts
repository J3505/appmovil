import { Test, TestingModule } from '@nestjs/testing';
import { TipoBebidaService } from './tipo-bebida.service';

describe('TipoBebidaService', () => {
  let service: TipoBebidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoBebidaService],
    }).compile();

    service = module.get<TipoBebidaService>(TipoBebidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
