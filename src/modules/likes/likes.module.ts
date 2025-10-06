import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController, UserLikesController } from './likes.controller';
import { UserLikesBlock } from '../../entities/user-likes-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLikesBlock])],
  controllers: [LikesController, UserLikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
