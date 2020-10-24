import { GoalStep } from './goalStep';
import { Category } from './category';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './todo';

export class Goal {
  id: string;
  name: string;
  category: Category;
  why: string;
  picture: string;
  desc: string;
  steps: Array<GoalStep>;
  activ: boolean;
  startTime: Date;
  endTime: Date;
  title: string;
  calItemId: string;
  todoIds: Array<string>;
  progress: number;
  prio: number;

  constructor(name: string, why: string, progress: number, prio: number) {

    this.name = name;
    this.why = why;
    this.steps = new Array<GoalStep>();
    this.todoIds = new Array<string>();
    this.activ = true
    this.id = uuidv4();
    this.progress = progress;
    this.prio = prio;
  }

  addStep(step: GoalStep) {
    if (step) {
      this.steps.push(step);
    }

  }
}