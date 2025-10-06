import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('followers')
@Controller('groups/:groupId')
@UseGuards(JwtAuthGuard)
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post('follow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a group' })
  followGroup(@CurrentUser() user: any, @Param('groupId') groupId: string) {
    return this.followersService.followGroup(user.id, groupId);
  }

  @Delete('follow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a group' })
  unfollowGroup(@CurrentUser() user: any, @Param('groupId') groupId: string) {
    return this.followersService.unfollowGroup(user.id, groupId);
  }

  @Get('followers-count')
  @ApiOperation({ summary: 'Get follower count for a group' })
  getFollowersCount(@Param('groupId') groupId: string) {
    return this.followersService.getFollowersCount(groupId);
  }
}

@ApiTags('followers')
@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UserFollowingController {
  constructor(private readonly followersService: FollowersService) {}

  @Get('following')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get groups current user follows' })
  getUserFollowing(@CurrentUser() user: any) {
    return this.followersService.getUserFollowing(user.id);
  }
}
