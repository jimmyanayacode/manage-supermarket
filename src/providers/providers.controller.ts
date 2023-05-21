import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.providersService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.providersService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  changeStatusProvider(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.changeStatusProvider(id);
  }
}
