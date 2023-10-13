import {applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response200 } from 'src/api-responses/response.200';
import { Response201 } from 'src/api-responses/response.201';
import { Response400 } from 'src/api-responses/response.400';
import { Response404 } from 'src/api-responses/response.404';
import { Response500 } from 'src/api-responses/response.500';

export function DefaultApiResponse(
    response200?: Response200,
    response201?: Response201,
    response400?: Response400,
    response404?: Response404,
    response500?: Response500,
  ) {
    let defaultApiDecorator = applyDecorators();
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
            defaultApiDecorator = applyDecorators(defaultApiDecorator, ApiResponse(arguments[i]))
        }
    }
    
  return defaultApiDecorator;

}