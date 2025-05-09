import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('producto')
// importar roles y jwt para proteger las rutas
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'PROVEEDOR')
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'PROVEEDOR', 'CLIENTE')
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'PROVEEDOR', 'CLIENTE')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMINISTRADOR', 'PROVEEDOR')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
