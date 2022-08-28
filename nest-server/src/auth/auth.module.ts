import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoService } from 'src/services';
import JwtStrategy from 'src/strategies/jwt.strategy';
import { Utils } from 'src/utils/utils';
@Module({
  providers: [CryptoService, Utils, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${process.env.JWT_SALT}`,
      signOptions: {
        expiresIn: `${process.env.JWT_EXP}`,
      },
    }),
  ],
  exports: [CryptoService, Utils, JwtStrategy],
})
export class AuthModule {}
