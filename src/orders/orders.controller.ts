import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    description: 'Users has been created',
    type: Boolean,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.publishProccessOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Find all orders' })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Find all Ok',
    type: Boolean,
  })
  @Get()
  findAll() {
    return this.ordersService.findAll({});
  }
}
