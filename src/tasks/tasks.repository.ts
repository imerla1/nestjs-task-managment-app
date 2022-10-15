import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Task } from 'src/task.entity';
import { EntityRepository, Repository } from 'typeorm';

@CustomRepository(Task)
export class TasksRepository extends Repository<Task> {}
