import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HandleLoginDto {
  @ApiProperty({
    example: 'pedro@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123@abc@aSD1',
  })
  @IsString()
  password: string;
}
