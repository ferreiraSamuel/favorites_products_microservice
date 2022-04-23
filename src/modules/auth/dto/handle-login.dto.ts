import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HandleLoginDto {
  @ApiProperty({
    example: 'exemplo@exemplo.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123@abc',
  })
  @IsString()
  password: string;
}
