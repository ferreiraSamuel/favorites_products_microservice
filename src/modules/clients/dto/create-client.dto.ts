import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'Pedro Paulo',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 'pedro@email.com' })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ example: '123@abc@aSD1' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;
}
