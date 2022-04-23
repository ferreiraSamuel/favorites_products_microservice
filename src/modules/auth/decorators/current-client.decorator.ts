import { createParamDecorator } from '@nestjs/common';

export const CurrentClient = createParamDecorator((_, request: any) => {
  return request.args[0].user;
});
