import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Task } from 'src/tasks/models/task.model';
import { TaskDTO } from './DTO/task.dto';

@Controller('tasks')
export class TasksController {
  allTasks: Task[] = [
    new Task('1', 'project 0', 2025, 'todo', new Date(2023, 5, 4)),
    new Task('2', 'project 1', 2026, 'in progress', new Date(2024, 6, 6)),
    new Task('3', 'project 2', 2026, 'todo', new Date(2022, 3, 3)),
  ];

  // @Get('search/:id')
  // getTaskById(@Req() req : Request) {
  //     console.log(req.params);
  //     return {}

  // }

  @Get('hello')
  afficherSalut(@Req() req: Request, @Res() res: Response) {
    console.log(res);

    // return "Je m'appelle Nidhal"
    //return { prenom : "Nidhal", anneee : 2025}
    return res.json({ prenom: 'Nidhal', anneee: 2025 });
  }

  @Get('filter')
  filterTasksByYear(@Query('year') annee) {
    let result = this.allTasks.filter((element) => element.year == annee);

    // return "Je m'appelle Nidhal"
    return { result };
    // return res.json({ prenom: 'Nidhal', anneee: 2025 });
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id) {
    console.log(typeof id);
    return { id };
  }
  // @Post('add')
  // addTask(@Req() req : Request) {
  //     this.allTasks.push(req.body);
  //     return this.allTasks
  // }
  //   @Post('add')
  //   addTask(@Body('title') tit, @Body('statut') st) {
  //     console.log(tit, st);

  //     //this.allTasks.push(b);
  //     return this.allTasks;
  //   }
  @Post('add')
  addTask(@Body(ValidationPipe) body: TaskDTO) {
    console.log(body);
    console.log(body instanceof TaskDTO);

    const { title, year, statut } = body;
    let generatedId = crypto.randomUUID();
    let d = new Date();
    let newTask = new Task(generatedId, title, year, statut, d);
    this.allTasks.push(newTask);
    return this.allTasks;
  }
}

//http://nomdedomaine/tasks/nidhal

// function addition(a, b) {
//   return a + b;
// }

// (a, b) => {
//   return a + b;
// };

// (a, b) => a + b;

// (a) => a + 10;
// () => 20 + 10;
