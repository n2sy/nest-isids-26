import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    allTasks = [
        {
          id: 1,
          title: 'Project 0',
          statut: 'todo',
          year: 2025,
        },
        {
          id: 2,
          title: 'Project 1',
          statut: 'done',
          year: 2025,
        },
        {
          id: 3,
          title: 'Project 1',
          statut: 'in progress',
          year: 2026,
        },
      ];
    chercherTousLesTasks() {
            return this.allTasks;

    }
}
