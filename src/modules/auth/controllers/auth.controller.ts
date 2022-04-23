import { ClientFromJWT } from './../interfaces/client-from-jwt.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { HandleLoginDto } from '../dto/handle-login.dto';
import { IsPublic } from '../decorators/is-public.decorator';
import { CurrentClient } from '../decorators/current-client.decorator';

@Controller()
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @IsPublic()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: HandleLoginDto,
  })
  login(@CurrentClient() client: ClientFromJWT) {
    return this.authService.getToken(client);
  }
}
