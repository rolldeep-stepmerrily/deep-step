import { Term as TermModel } from '@prisma/client';
import { IsBoolean, IsPositive } from 'class-validator';

import { Common } from 'src/common/entities';

export class Term extends Common implements TermModel {
  @IsPositive()
  id: number;

  @IsBoolean()
  isService: boolean;

  @IsBoolean()
  isPrivacy: boolean;

  @IsBoolean()
  isPrivacyOption: boolean;

  @IsBoolean()
  isAge: boolean;
}
