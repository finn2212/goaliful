import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoalsService } from '../goals.service'
import { Router } from '@angular/router';
import { Goal } from '../../models/goal';
import { GoalStep } from '../../models/goalStep'
import { TodoService } from 'src/app/todos/todo.service';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.page.html',
  styleUrls: ['./goal-detail.page.scss'],
})
export class GoalDetailPage implements OnInit {
  GoalName;
  GoalWhy;
  steps = new Array<GoalStep>();
  newStepString;
  goal: Goal;
  mode: boolean;
  goalTodos = new Array<Todo>();
  todosDone: number;
  newTodoName = "";

  constructor(private goalsService: GoalsService,
    private router: Router, private todoService: TodoService
  ) { }


  ngOnInit() {
    this.goal = this.goalsService.selectedGoal;
    if (!this.goal) {
      this.router.navigateByUrl('/tabs/goals');
    }

  }
  ionViewWillEnter() {
    this.goal = this.goalsService.selectedGoal;
    this.getTodosFromGoal();
  }

  async onSubmit(form: NgForm) {
    this.goalsService.newGoalSteps = this.steps;
    this.steps = [];
    await this.goalsService.createGoal();
    form.reset();
  }
  addTodo() {
    if (this.newTodoName.length > 0) {
      const newTodo = new Todo(this.newTodoName, 'sometime');
      this.goalsService.addTodosToGoal(newTodo);
      this.todoService.addSingleTodo(newTodo);
    }
    this.newTodoName = "";
    this.getTodosFromGoal();

  }
  addStep() {
    if (this.newStepString) {
      const step = new GoalStep(this.newStepString);
      this.steps.push(step);
    }
    this.newStepString = '';
    console.log('addStep');
  }
  changeMode() {
    this.mode = !this.mode;
    console.log(this.mode);
  }
  getTodosFromGoal() {
    if (this.goal) {
      this.goalTodos = this.goalsService.getTodosFromGoal(this.goal);
      this.todosDone = this.goal.progress - this.goalTodos.length;


    }
  }


}
