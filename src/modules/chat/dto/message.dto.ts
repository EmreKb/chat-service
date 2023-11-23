import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageDto {
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  content: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
