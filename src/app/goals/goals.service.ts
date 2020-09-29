import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Storage } from '@ionic/storage';
import { GoalStep } from '../models/goalStep';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CalenderService } from '../calendar/calender.service'
import { Calitem } from '../models/calItem';
import { Todo } from '../models/todo';
import { TodoService } from '../todos/todo.service';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goals = new BehaviorSubject<Goal[]>([]);
  _goals;
  isDataLoad = false;

  newGoalName: string;
  newGoalWhy: string;
  newGoalCategory;
  newGoalSteps: Array<GoalStep> = [];
  newGoalDesc: string;
  selectedGoal: Goal;
  newGoalStartDate: Date;
  newGoalEndDate: Date;
  newGoalTodos: Array<Todo> = [];
  promiseGoals: [];



  constructor(
    private localDb: Storage,
    private router: Router,
    private calService: CalenderService,
    private todoService: TodoService

  ) { }

  getGoalsObservable() {
    return this.goals.asObservable();
  }


  createGoal() {
    const goal = new Goal(this.newGoalName, this.newGoalWhy, this.newGoalTodos.length);
    console.log("goal Created with Uid: " + goal.id)
    goal.steps = this.newGoalSteps;
    goal.category = this.newGoalCategory;
    goal.desc = this.newGoalDesc;
    if (this.newGoalStartDate) {
      goal.startTime = this.newGoalStartDate;
    }
    if (this.newGoalEndDate) {
      goal.endTime = this.newGoalEndDate;
    }
    if (this.newGoalEndDate && this.newGoalEndDate) {
      let cal = new Calitem(goal.name, goal.startTime, goal.endTime);
      this.calService.addEventToCalendar(cal);
      console.log("addet to Cal Service");
    }
    if (this.newGoalTodos.length > 0) {
      this.newGoalTodos.forEach(el => {
        goal.todoIds.push(el.id);

      })
      this.todoService.addTodoList(this.newGoalTodos);

    }

    this.goals.getValue().push(goal);
    this.updateGoal();
    this.newGoalSteps = [];
    this.newGoalName = "";
    this.newGoalWhy = "";
    this.newGoalEndDate = null;
    this.newGoalEndDate = null;
    this.newGoalTodos = [];
    this.router.navigateByUrl('/tabs/goals');

  }
  checkAllIsDone() {
    this.goals.getValue().forEach(goal => {
      if (this.checkIfDone(goal) == true) {
        goal.activ = false;
      }
    })
  }
  private checkIfDone(goal: Goal) {
    let isDone = false
    if (this.todoService.getTodosFromGoal(goal.todoIds).length == 0 && goal.todoIds.length > 0) {
      isDone = true
    }

    return isDone;
  }


  getTodosFromGoal(goal: Goal) {
    const todos = this.todoService.getTodosFromGoal(goal.todoIds);
    return todos;
  }
  addTodosToGoal(todo: Todo) {
    this.goals.getValue().forEach(el => {
      if (this.selectedGoal.id == el.id) {
        el.todoIds.push(todo.id);
        el.progress = el.progress + 1;
      }
    })

  }


  public updateGoal() {
    this.localDb.set('goals', this.goals.getValue());
  }

  loadGoal() {
    return new Promise((resolve, reject) => {
      this.localDb.get('goals')
        .then(goals => {
          resolve(goals);
          this._goals = goals
        })
        .catch(reject);
    });
  }

  loadToArry() {
    if (this._goals) {
      this._goals.forEach(element => {
        this.goals.getValue().push(element);
      });
    }
  }
}