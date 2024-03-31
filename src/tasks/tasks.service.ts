import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {

        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const uuid = crypto.randomUUID()
        const { title, description } = createTaskDto

        const task: Task = {
            id: uuid,
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTaskById(id: string): string {
        this.tasks = this.tasks.filter(task => task.id !== id)
        return 'Success'
    }
}
