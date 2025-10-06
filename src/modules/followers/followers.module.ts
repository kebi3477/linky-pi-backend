import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './followers.service';
import {
  FollowersController,
  UserFollowingController,
} from './followers.controller';
import { Follower } from '../../entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  controllers: [FollowersController, UserFollowingController],
  providers: [FollowersService],
  exports: [FollowersService],
})
export class FollowersModule {}
