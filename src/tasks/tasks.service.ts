import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

const uuid = crypto.randomUUID()
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid,
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }
}
