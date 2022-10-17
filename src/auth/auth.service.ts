import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredenialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredenialsDto: AuthCredenialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredenialsDto);
  }
  async signIn(
    authCredenialsDto: AuthCredenialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredenialsDto;
    const user = await this.usersRepository.findOneBy({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
