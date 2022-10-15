import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
  getTaskById(task_id: string): Task {
    const found = this.tasks.find((x) => x.id === task_id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${task_id}" not found`);
    }
    return found;
  }
  deleteTaskById(task_id: string): Task {
    const task = this.getTaskById(task_id);
    if (task) {
      const task_index = this.tasks.indexOf(task);
      this.tasks.splice(task_index, 1);
      return task;
    }
  }
  updateTaskStatus(task_id: string, new_status: string): Task {
    const task = this.getTaskById(task_id);
    if (new_status in TaskStatus) {
      const status = TaskStatus[new_status];
      task.status = status;
    }
    return task;
  }
}
