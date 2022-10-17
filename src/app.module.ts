import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks/tasks.repository';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-managment',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Task, User],
      logging: ['query'],
    }),
  ],
})
export class AppModule {}
