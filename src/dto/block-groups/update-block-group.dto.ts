import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockGroupDto } from './create-block-group.dto';

export class UpdateBlockGroupDto extends PartialType(CreateBlockGroupDto) {}
