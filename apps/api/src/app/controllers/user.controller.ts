import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from "../guards/jwt.guard";
import { UserId } from "../decorators/user.decorator";

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JWTAuthGuard)
  @Post('info')
  async info(@UserId() userId: string) {}

}
