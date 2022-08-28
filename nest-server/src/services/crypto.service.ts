import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import cryptoJs from 'crypto-js';
import { Utils } from 'src/utils/utils';
import { ObjectLiteral } from 'typeorm';
@Injectable()
export default class CryptoService {
  constructor(private utils: Utils, private jwtService: JwtService) {}
  private readonly hmacAlgorithm = 'sha256';
  public gethash(feed: string): string {
    return cryptoJs.SHA256(feed).toString();
  }
  public signIn: any = (identity: string, throwError?: boolean) => {
    console.log(this.jwtService);
    try {
      return this.jwtService.sign({ user: identity });
    } catch (e) {
      console.log(e);
      if (throwError) {
        throw Error(e);
      }
      return false;
    }
  };

  public encrypt(data: string): string {
    return cryptoJs.AES.encrypt(data, process.env.JWT_SALT).toString();
  }
  public decrypt(data: string): string {
    return cryptoJs.AES.decrypt(data, process.env.JWT_SALT).toString(
      cryptoJs.enc.Utf8,
    );
  }

  public verify(token: string): ObjectLiteral {
    return this.jwtService.verify(token);
    //     return new Promise((resolve) => {
    //   try {
    //     // .verify(token, process.env.JWT_SALT, (err, decoded: any) => {
    //     //   if (err) return resolve(null);
    //     //   resolve(decoded.id);
    //     // });
    //   } catch (e) {
    //     resolve(null);
    //   }
    // });
  }

  //   public getHmac(
  //     phone: string,
  //     data: string,
  //     expiresAfter: number,
  //     externalData?: string,
  //   ): string {
  //     const expires = Date.now() + expiresAfter * 60 * 1000;
  //     return `${crypto
  //       .createHmac(this.hmacAlgorithm, '')
  //       .update(`${phone}.${data}.${expires}`)
  //       .digest('hex')}.${this.encrypt(`${expires}`)}${
  //       (externalData && `.${externalData}`) || ''
  //     }`;
  //   }
  //   public verifyHmac(phone: string, data: string, hash: string): boolean {
  //     try {
  //       if (!hash.match('.')) return false;
  //       let [hashValue, expires] = hash.split('.');
  //       expires = this.decrypt(expires);
  //       if (Date.now() > Number(expires)) return false;
  //       let newCalculatedHash = crypto
  //         .createHmac(this.hmacAlgorithm, '')
  //         .update(`${phone}.${data}.${expires}`)
  //         .digest('hex');
  //       return newCalculatedHash === hashValue;
  //     } catch (e) {
  //       return false;
  //     }
  //   }

  //   public decryptEmailAuthData<
  //     T extends VerifySuperAdminPayload | VerifyAdminPayload,
  //   >(encrypted: string, expiryLimit: number): false | T {
  //     try {
  //       const parsedData = JSON.parse(this.decrypt(encrypted)) as T;
  //       return (
  //         (!this.utils.timeExpired(parsedData.date, expiryLimit) &&
  //           (parsedData as T)) ||
  //         false
  //       );
  //     } catch (e) {
  //       return false;
  //     }
  //   }
}
