import { Transform } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @Transform(({ value }) =>
    value === undefined || value === null || String(value).trim() === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  @Min(1)
  page: number = 1;

  @Transform(({ value }) =>
    value === undefined || value === null || String(value).trim() === ''
      ? undefined
      : Number(value),
  )
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
