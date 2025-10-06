import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockGroup } from '../../entities/block-group.entity';
import { CreateBlockGroupDto } from '../../dto/block-groups/create-block-group.dto';
import { UpdateBlockGroupDto } from '../../dto/block-groups/update-block-group.dto';

@Injectable()
export class BlockGroupsService {
  constructor(
    @InjectRepository(BlockGroup)
    private blockGroupsRepository: Repository<BlockGroup>,
  ) {}

  async create(
    userId: string,
    createBlockGroupDto: CreateBlockGroupDto,
  ): Promise<BlockGroup> {
    const blockGroup = this.blockGroupsRepository.create({
      ...createBlockGroupDto,
      userId,
    });
    return this.blockGroupsRepository.save(blockGroup);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<BlockGroup[]> {
    return this.blockGroupsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<BlockGroup> {
    const blockGroup = await this.blockGroupsRepository.findOne({
      where: { id },
      relations: ['user', 'blocks', 'followers'],
    });
    if (!blockGroup) {
      throw new NotFoundException(`BlockGroup with ID ${id} not found`);
    }
    return blockGroup;
  }

  async update(
    id: string,
    userId: string,
    updateBlockGroupDto: UpdateBlockGroupDto,
  ): Promise<BlockGroup> {
    const blockGroup = await this.blockGroupsRepository.findOne({
      where: { id, userId },
    });
    if (!blockGroup) {
      throw new NotFoundException(`BlockGroup with ID ${id} not found`);
    }
    Object.assign(blockGroup, updateBlockGroupDto);
    return this.blockGroupsRepository.save(blockGroup);
  }

  async remove(id: string, userId: string): Promise<void> {
    const blockGroup = await this.blockGroupsRepository.findOne({
      where: { id, userId },
    });
    if (!blockGroup) {
      throw new NotFoundException(`BlockGroup with ID ${id} not found`);
    }
    await this.blockGroupsRepository.remove(blockGroup);
  }

  async getGroupBlocks(id: string) {
    const blockGroup = await this.blockGroupsRepository.findOne({
      where: { id },
      relations: ['blocks'],
    });
    if (!blockGroup) {
      throw new NotFoundException(`BlockGroup with ID ${id} not found`);
    }
    return blockGroup.blocks;
  }

  async getGroupFollowers(id: string) {
    const blockGroup = await this.blockGroupsRepository.findOne({
      where: { id },
      relations: ['followers', 'followers.user'],
    });
    if (!blockGroup) {
      throw new NotFoundException(`BlockGroup with ID ${id} not found`);
    }
    return blockGroup.followers;
  }
}
