import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/get-filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDto: FilterDto): Task[] {

        const { status, search } = filterDto
        let tasks = this.getAllTasks()

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search) ? true : false)
        }

        return tasks
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

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }

    deleteTaskById(id: string): string {
        this.tasks = this.tasks.filter(task => task.id !== id)
        return 'Success'
    }
}
