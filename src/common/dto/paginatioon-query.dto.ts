import { IsNumberString } from 'class-validator';

export class PaginationQueryDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;
}
