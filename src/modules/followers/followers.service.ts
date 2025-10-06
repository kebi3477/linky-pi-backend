import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from '../../entities/follower.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
  ) {}

  async followGroup(userId: string, groupId: string) {
    const existingFollow = await this.followersRepository.findOne({
      where: { userId, groupId },
    });

    if (existingFollow) {
      throw new ConflictException('Already following this group');
    }

    const follower = this.followersRepository.create({ userId, groupId });
    return this.followersRepository.save(follower);
  }

  async unfollowGroup(userId: string, groupId: string) {
    const follower = await this.followersRepository.findOne({
      where: { userId, groupId },
    });

    if (!follower) {
      throw new NotFoundException('Follow relationship not found');
    }

    await this.followersRepository.remove(follower);
    return { message: 'Group unfollowed successfully' };
  }

  async getUserFollowing(userId: string) {
    return this.followersRepository.find({
      where: { userId },
      relations: ['group', 'group.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getFollowersCount(groupId: string): Promise<number> {
    return this.followersRepository.count({ where: { groupId } });
  }
}
