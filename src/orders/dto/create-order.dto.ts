import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 4321,
    description: 'BeerId',
  })
  @IsNumber()
  readonly beerId: string;

  @ApiProperty({
    example: '12.345.678-9',
    description: 'Customer rut',
  })
  @IsString()
  readonly customerRut: string;

  @ApiProperty({
    example: 2,
    description: 'Beers order quantity',
  })
  @IsNumber()
  readonly quantity: number;
}
