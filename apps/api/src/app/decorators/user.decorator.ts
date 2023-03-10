import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator((data, ctx:ExecutionContext)=>{
  return ctx.switchToHttp().getRequest()?.user;
});
