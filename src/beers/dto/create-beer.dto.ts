import { BeerTypes } from '../enum/beer-types.enum';

export class CreateBeerDto {
  name: string;
  price: number;
  type: BeerTypes;
}
