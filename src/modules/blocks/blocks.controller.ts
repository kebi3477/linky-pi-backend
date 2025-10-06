import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from '../../dto/blocks/create-block.dto';
import { UpdateBlockDto } from '../../dto/blocks/update-block.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('blocks')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new block' })
  create(@CurrentUser() user: any, @Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(user.id, createBlockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blocks with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.blocksService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search blocks by hashtag/title/content' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  search(
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.blocksService.search(
      query,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get block by ID' })
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(id);
  }

  @Get(':id/likes')
  @ApiOperation({ summary: 'Get block likes count' })
  getLikesCount(@Param('id') id: string) {
    return this.blocksService.getLikesCount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update block' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateBlockDto: UpdateBlockDto,
  ) {
    return this.blocksService.update(id, user.id, updateBlockDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete block' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blocksService.remove(id, user.id);
  }
}
