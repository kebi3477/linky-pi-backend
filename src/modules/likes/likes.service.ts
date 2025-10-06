import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLikesBlock } from '../../entities/user-likes-block.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(UserLikesBlock)
    private likesRepository: Repository<UserLikesBlock>,
  ) {}

  async likeBlock(userId: string, blockId: string) {
    const existingLike = await this.likesRepository.findOne({
      where: { userId, blockId },
    });

    if (existingLike) {
      throw new ConflictException('Block already liked');
    }

    const like = this.likesRepository.create({ userId, blockId });
    return this.likesRepository.save(like);
  }

  async unlikeBlock(userId: string, blockId: string) {
    const like = await this.likesRepository.findOne({
      where: { userId, blockId },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likesRepository.remove(like);
    return { message: 'Block unliked successfully' };
  }

  async getUserLikes(userId: string) {
    return this.likesRepository.find({
      where: { userId },
      relations: ['block', 'block.user'],
      order: { createdAt: 'DESC' },
    });
  }
}
