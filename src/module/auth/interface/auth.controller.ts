import { Body, Post, Controller } from '@nestjs/common';
import { SignUpDto } from '../application/dto/sign-up.dto';
import { AuthService } from '../application/service/auth.service';
import { User } from '../domain/user.entity';
import { Public } from '../application/decorator/public.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
}
