import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './model/orders.model';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Orders', schema: OrderSchema }]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
