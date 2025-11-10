import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
  allTasks: Task[] = [
    {
      id: '1',
      title: 'Project 0',
      statut: 'todo',
      year: 2025,
      createdAt: new Date(2024, 5, 6),
    },
    {
      id: '2',
      title: 'Project 1',
      statut: 'done',
      year: 2025,
      createdAt: new Date(2024, 2, 3),
    },
    {
      id: '3',
      title: 'Project 1',
      statut: 'in progress',
      year: 2026,
      createdAt: new Date(2025, 11, 10),
    },
  ];

  getNbTasks(y1, y2) {
    let t = this.allTasks.filter((task) => task.year >= y1 && task.year <= y2);
    return {
      selectedTasks: t,
    };
  }

  getAllTasks() {
    return this.allTasks;
  }

  getTaskById(taskId) {
    let searchedTask = this.allTasks.find((element) => element.id == taskId);
    return searchedTask;
  }

  addNewTask(task) {
    let generatedId = crypto.randomUUID();

    let newTask = new Task(
      generatedId,
      task.title,
      task.year,
      task.statut,
      new Date(),
    );
    this.allTasks.push(newTask);
    return {
      message: 'Task added successfully',
      generatedId,
    };
  }

  updateTask(taskId, uTask) {
    let i = this.allTasks.findIndex((element) => element.id == taskId);

    this.allTasks[i] = {
      taskId,
      ...uTask,
    };

    return {
      message: 'Task updated successfully',
      tab: this.allTasks,
    };
  }

  deleteTask(taskId) {
    let i = this.allTasks.findIndex((element) => element.id == taskId);
    this.allTasks.splice(i, 1);
    return {
      message: 'Task deleted',
      tab: this.allTasks,
    };
  }
}
