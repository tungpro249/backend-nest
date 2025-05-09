import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../globalClass';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // support structure like: { data: [...], pagination: {...}, message: "...", code: 200 }
        const { data, pagination, message = 'Success', code = 200 } = response;

        return new ResponseData(data, code, message, pagination);
      }),
    );
  }
}
