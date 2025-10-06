import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockGroupsService } from './block-groups.service';
import { BlockGroupsController } from './block-groups.controller';
import { BlockGroup } from '../../entities/block-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockGroup])],
  controllers: [BlockGroupsController],
  providers: [BlockGroupsService],
  exports: [BlockGroupsService],
})
export class BlockGroupsModule {}
