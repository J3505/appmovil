import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { ProductoModule } from './producto/producto.module';
import { MarcaModule } from './marca/marca.module';
import { PedidoModule } from './pedido/pedido.module';
import { TipoBebidaModule } from './tipo-bebida/tipo-bebida.module';
import { TamanioEnvaseModule } from './tamanio-envase/tamanio-envase.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    // AuthModule for authentication and authorization
    // UserModule for user management
    AuthModule,
    UserModule,
    ProductoModule,
    MarcaModule,
    PedidoModule,
    TipoBebidaModule,
    TamanioEnvaseModule,
    DetallePedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
