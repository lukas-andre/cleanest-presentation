import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../global/guards/auth.guard';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer } from './entities/beer.entity';
@ApiBearerAuth()
@ApiTags('beers')
@Controller('beers')
@UseGuards(AuthGuard)
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @ApiOperation({ summary: 'Create Beer' })
  @ApiCreatedResponse({
    description: 'Beer has been created',
    type: Beer,
  })
  @Post()
  create(@Body() createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }

  @ApiOperation({ summary: 'Find all Beers' })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Find beers ok',
    type: Beer,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.beersService.findAll();
  }

  @ApiOperation({ summary: 'Find one Beer' })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Find beer ok',
    type: Beer,
  })
  @ApiNotFoundResponse({
    description: 'Beer not found',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Beer id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Beer' })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Update beer ok',
    type: Beer,
  })
  @ApiNotFoundResponse({
    description: 'Beer not found',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Beer id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.update(+id, updateBeerDto);
  }

  @ApiOperation({ summary: 'Delete Beer' })
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Delete beer ok',
    type: Beer,
  })
  @ApiNotFoundResponse({
    description: 'Beer not found',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Beer id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beersService.remove(+id);
  }
}
