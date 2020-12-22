import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SNSClient } from '../global/clients/sns.client';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order, 'example-order-db')
    private readonly ordersRepository: Repository<Order>,
    private readonly SNSClient: SNSClient,
    private readonly configService: ConfigService,
  ) {}

  async publishProccessOrder(createOrderDto: CreateOrderDto) {
    const result = await this.SNSClient.publishMessageToTopic(
      createOrderDto,
      this.configService.get('topics.processOrder'),
    );
    this.logger.log('result: ' + JSON.stringify(result));
    return true;
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.ordersRepository.save(createOrderDto);
  }

  findAll(options: FindManyOptions<Order>) {
    return this.ordersRepository.find(options);
  }
}
