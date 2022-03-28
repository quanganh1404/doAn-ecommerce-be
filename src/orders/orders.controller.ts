import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Helper
  @ApiOperation({ summary: 'Fake order by faker "number" times' })
  @Get('fake/:number')
  async fakeDataByFaker(@Param('number') number: number) {
    return await this.ordersService.fakeDataByFaker(number);
  }

  // End helper

  @ApiOperation({ summary: 'Get order dashboard home page' })
  @Get('/dashboard')
  async dashboard() {
    return this.ordersService.dashboard();
  }

  @ApiOperation({ summary: 'Get user ordered items' })
  @Get('users/:userId')
  async orderdItemsByUser(@Param('userId') userId: string) {
    return await this.ordersService.orderdItemsByUser(userId);
  }

  @ApiOperation({ summary: 'Update Paid' })
  @Get('/paid/:orderId')
  async paidUser(@Param('orderId') orderId: string) {
    return this.ordersService.paidUser(orderId);
  }

  @ApiOperation({ summary: 'Get python orders' })
  @Get('python')
  getPythonOrders() {
    return this.ordersService.pyGetData();
  }

  @ApiOperation({ summary: 'Create order' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all order' })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get order by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update order by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete order by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
