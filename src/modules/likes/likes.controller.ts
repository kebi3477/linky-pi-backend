import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('blocks/:blockId')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a block' })
  likeBlock(@CurrentUser() user: any, @Param('blockId') blockId: string) {
    return this.likesService.likeBlock(user.id, blockId);
  }

  @Delete('like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlike a block' })
  unlikeBlock(@CurrentUser() user: any, @Param('blockId') blockId: string) {
    return this.likesService.unlikeBlock(user.id, blockId);
  }
}

@ApiTags('likes')
@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UserLikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('likes')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's liked blocks" })
  getUserLikes(@CurrentUser() user: any) {
    return this.likesService.getUserLikes(user.id);
  }
}
