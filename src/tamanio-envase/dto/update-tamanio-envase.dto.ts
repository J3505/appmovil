import { PartialType } from '@nestjs/mapped-types';
import { CreateTamanioEnvaseDto } from './create-tamanio-envase.dto';

export class UpdateTamanioEnvaseDto extends PartialType(CreateTamanioEnvaseDto) {}
