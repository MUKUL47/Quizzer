import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { DATA_SOURCE } from 'src/database/database.provider';
import { RepositoryProvider, User } from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/services';
import { Utils } from 'src/utils/utils';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    Utils,
    RepositoryProvider.getProvider(RepositoryProvider.USER, User),
    JwtGuard,
  ],
})
export class UsersModule {}
