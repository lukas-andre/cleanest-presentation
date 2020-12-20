import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueueService } from './services/queue.service';

@Controller('queue')
@ApiTags('Queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @ApiOperation({ summary: 'List queues with message quantity' })
  @ApiResponse({ status: 200 })
  @Get('/')
  async listQueues(): Promise<any> {
    const queues = await this.queueService.listQueues();
    return Promise.all(
      queues.map(queue => this.queueService.getQueueMessageQuantity(queue)),
    );
  }
}
