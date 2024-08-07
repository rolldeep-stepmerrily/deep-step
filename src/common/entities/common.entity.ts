import { IsDate, IsOptional } from 'class-validator';

export class Common {
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  @IsDate()
  deletedAt: Date | null;
}
