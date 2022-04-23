import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @IsString()
  @ApiProperty({ example: '123@abc' })
  currentPassword: string;
}
