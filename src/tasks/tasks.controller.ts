import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Task } from './models/task.model';
import { TaskDTO } from './DTO/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSer: TasksService) {}

  //@Inject(TasksService) taskSer;

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

  @Get('all') //GET nomdudomaine/task/all
  getAllTasks(@Req() request: Request, @Res() response: Response) {
    return this.taskSer.getAllTasks();
  }

  @Get('stats')
  nbreTask(
    @Query('startYear', ParseIntPipe) y1,
    @Query('endYear', ParseIntPipe) y2,
  ) {
    return this.taskSer.getNbTasks(y1, y2);
  }

  @Get('search/:id')
  getTaskById(@Param('id') taskId) {
    return this.taskSer.getTaskById(taskId);
  }

  @Post('add')
  addNewTask(@Body() body: TaskDTO, @Res() res: Response) {
    return res.json(this.taskSer.addNewTask(body));
  }

  @Put('edit/:id')
  updateTask(@Body() uTask, @Param('id') id) {
    return this.taskSer.updateTask(id, uTask);
  }

  @Delete('delete/:deleteId')
  deleteTask(@Param('deleteId') id) {
    return this.taskSer.deleteTask(id);
  }
}
