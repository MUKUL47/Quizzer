import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RepositoryProvider, User } from 'src/database/entities';
import { JwtResponse } from 'src/interfaces';
import { UserRegisterDto } from 'src/models/users/dto';
import { Repository } from 'typeorm';
import CryptoService from './crypto.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryProvider.USER)
    private readonly repository: Repository<User>,
    private cryptoService: CryptoService,
  ) {}
  public async getById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    delete user.password;
    return user;
  }

  public async login({
    email,
    password,
  }: UserRegisterDto): Promise<JwtResponse> {
    const user = await this.repository.findOne({ where: { email, password } });
    if (user === null)
      throw new UnauthorizedException('Unknown email or password');
    return {
      accessToken: this.cryptoService.signIn(user.id) as string,
    };
  }

  async registerUser({
    email,
    password,
  }: UserRegisterDto): Promise<JwtResponse> {
    const user = await this.repository.findOne({ where: { email } });
    if (user !== null) throw new BadRequestException('User already exist');
    const { id } = await this.repository.save(
      this.repository.create({
        email,
        password,
      }),
    );
    return {
      accessToken: this.cryptoService.signIn(id) as string,
    };
  }
}
