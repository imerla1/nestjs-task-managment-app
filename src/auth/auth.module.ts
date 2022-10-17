import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600, //Token expires within 3600 seconds
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

