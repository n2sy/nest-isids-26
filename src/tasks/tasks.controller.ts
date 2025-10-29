import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('tasks')
export class TasksController {
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
   let result = this.allTasks.filter((element) =>  element.year == annee)
   
   
   

    // return "Je m'appelle Nidhal"
    return { result }
    // return res.json({ prenom: 'Nidhal', anneee: 2025 });
  }

  @Get(':id')
  getTaskById(@Param('id') id) {
    console.log(id);
    return { id };
  }
  // @Post('add')
  // addTask(@Req() req : Request) {
  //     this.allTasks.push(req.body);
  //     return this.allTasks
  // }
  @Post('add')
  addTask(@Body('title') tit, @Body('statut') st) {
    console.log(tit, st);

    //this.allTasks.push(b);
    return this.allTasks;
  }
}

//http://nomdedomaine/tasks/nidhal

function addition(a, b) {
    return a + b;
}

 (a, b) => {
    return a + b;
}

 (a, b) =>  a + b;
 
 a =>  a + 10;
 () =>  20 + 10;


 
 
 
 
 