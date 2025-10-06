import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserType, AuthProvider } from '../../entities/user.entity';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;

  @IsOptional()
  @IsString()
  describe?: string;
}
