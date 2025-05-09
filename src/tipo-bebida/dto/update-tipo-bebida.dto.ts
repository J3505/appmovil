import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoBebidaDto } from './create-tipo-bebida.dto';

export class UpdateTipoBebidaDto extends PartialType(CreateTipoBebidaDto) {}
