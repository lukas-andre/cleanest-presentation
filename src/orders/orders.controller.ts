import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AuthGuard } from '../global/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiCreatedResponse({
    description: 'Order has been created',
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
    type: Order,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.ordersService.findAll({});
  }
}
