import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    example: 'Pedro Paulo Almeida',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'pedro2@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @ApiProperty({ example: '123@abc@aSD1' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsOptional()
  newPassword?: string;
}
