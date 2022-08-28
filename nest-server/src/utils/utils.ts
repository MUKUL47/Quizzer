import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  public isProduction(): boolean {
    return process.env.MODE === 'PROD';
  }
}
