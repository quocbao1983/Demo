import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTransDto } from './dto/create-trans.dto';
import { UpdateTransDto } from './dto/update-trans.dto';
import { TransService } from './trans.service';

@Controller('demo_trans')
export class TransController {
  constructor(private readonly transService: TransService) {}
  @Post()
  create(@Body() createTransDto: CreateTransDto) {
    return this.transService.create(createTransDto);
  }

  @Get()
  findAll() {
    return this.transService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransDto: UpdateTransDto) {
    return this.transService.update(id, updateTransDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transService.remove(id);
  }
}
