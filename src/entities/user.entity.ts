import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Block } from './block.entity';
import { BlockGroup } from './block-group.entity';
import { UserLikesBlock } from './user-likes-block.entity';
import { Follower } from './follower.entity';

export enum UserType {
  REGULAR = 'regular',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
}

@Entity('users')
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.REGULAR,
  })
  type: UserType;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider: AuthProvider;

  @Column({ nullable: true })
  describe: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // Relations
  @OneToMany(() => Block, (block) => block.user)
  blocks: Block[];

  @OneToMany(() => BlockGroup, (blockGroup) => blockGroup.user)
  blockGroups: BlockGroup[];

  @OneToMany(() => UserLikesBlock, (userLikesBlock) => userLikesBlock.user)
  likedBlocks: UserLikesBlock[];

  @OneToMany(() => Follower, (follower) => follower.user)
  following: Follower[];
}
