import { TaskStatus } from '../task.enum';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
