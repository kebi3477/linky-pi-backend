import { IsString } from 'class-validator';

export class CreateBlockGroupDto {
  @IsString()
  title: string;
}
