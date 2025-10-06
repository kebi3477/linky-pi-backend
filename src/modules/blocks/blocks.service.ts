import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Block } from '../../entities/block.entity';
import { CreateBlockDto } from '../../dto/blocks/create-block.dto';
import { UpdateBlockDto } from '../../dto/blocks/update-block.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blocksRepository: Repository<Block>,
  ) {}

  async create(userId: string, createBlockDto: CreateBlockDto): Promise<Block> {
    const block = this.blocksRepository.create({
      ...createBlockDto,
      userId,
    });
    return this.blocksRepository.save(block);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Block[]> {
    return this.blocksRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'group'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Block> {
    const block = await this.blocksRepository.findOne({
      where: { id },
      relations: ['user', 'group', 'likes'],
    });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
    return block;
  }

  async update(
    id: string,
    userId: string,
    updateBlockDto: UpdateBlockDto,
  ): Promise<Block> {
    const block = await this.blocksRepository.findOne({ where: { id, userId } });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
    Object.assign(block, updateBlockDto);
    return this.blocksRepository.save(block);
  }

  async remove(id: string, userId: string): Promise<void> {
    const block = await this.blocksRepository.findOne({ where: { id, userId } });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
    await this.blocksRepository.remove(block);
  }

  async search(query: string, page: number = 1, limit: number = 10) {
    return this.blocksRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { hashtag: Like(`%${query}%`) },
        { content: Like(`%${query}%`) },
      ],
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'group'],
      order: { createdAt: 'DESC' },
    });
  }

  async getLikesCount(id: string): Promise<number> {
    const block = await this.blocksRepository.findOne({
      where: { id },
      relations: ['likes'],
    });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
    return block.likes.length;
  }
}
