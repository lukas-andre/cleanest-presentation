import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { BeerTypes } from '../enum/beer-types.enum';

export class CreateBeerDto {
  @ApiProperty({
    example: 'Cusqueña',
    description: 'Beer name',
    required: true,
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1000',
    description: 'Beer price',
    required: true,
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: BeerTypes.Malt,
    description: 'Beer price',
    required: true,
    enum: BeerTypes,
  })
  @IsString()
  @IsIn(Object.keys(BeerTypes))
  type: BeerTypes;
}
