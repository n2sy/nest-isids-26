import { IsIn, IsInt, Length, Max, Min, MinLength } from 'class-validator';

export class TaskDTO {
  //   @MinLength(5, { message: 'Nombre de caractères < 5' })
  @Length(3, 10)
  public title: string;

  @IsInt()
  @Min(2020)
  @Max(2030)
  public year: number;

  @IsIn(['todo', 'done', 'in progress'])
  public statut: string;
}
