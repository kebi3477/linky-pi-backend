import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { BlockGroup } from './block-group.entity';
import { UserLikesBlock } from './user-likes-block.entity';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  subtitle: string;

  @Column('text', { nullable: true })
  content: string;

  @Column('text', { nullable: true })
  hashtag: string;

  @Column('text', { nullable: true })
  link: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'group_id', nullable: true })
  groupId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.blocks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => BlockGroup, (blockGroup) => blockGroup.blocks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group_id' })
  group: BlockGroup;

  @OneToMany(() => UserLikesBlock, (userLikesBlock) => userLikesBlock.block)
  likes: UserLikesBlock[];
}
