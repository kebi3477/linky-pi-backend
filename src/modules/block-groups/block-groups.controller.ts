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
import { BlockGroupsService } from './block-groups.service';
import { CreateBlockGroupDto } from '../../dto/block-groups/create-block-group.dto';
import { UpdateBlockGroupDto } from '../../dto/block-groups/update-block-group.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
export class BlockGroupsController {
  constructor(private readonly blockGroupsService: BlockGroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new group' })
  create(
    @CurrentUser() user: any,
    @Body() createBlockGroupDto: CreateBlockGroupDto,
  ) {
    return this.blockGroupsService.create(user.id, createBlockGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.blockGroupsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group by ID' })
  findOne(@Param('id') id: string) {
    return this.blockGroupsService.findOne(id);
  }

  @Get(':id/blocks')
  @ApiOperation({ summary: 'Get all blocks in group' })
  getGroupBlocks(@Param('id') id: string) {
    return this.blockGroupsService.getGroupBlocks(id);
  }

  @Get(':id/followers')
  @ApiOperation({ summary: 'Get group followers' })
  getGroupFollowers(@Param('id') id: string) {
    return this.blockGroupsService.getGroupFollowers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update group' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateBlockGroupDto: UpdateBlockGroupDto,
  ) {
    return this.blockGroupsService.update(id, user.id, updateBlockGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete group' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blockGroupsService.remove(id, user.id);
  }
}
