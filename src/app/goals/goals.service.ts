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
  newGoalPic;
  selectedGoal: Goal;
  newGoalStartDate: Date;
  newGoalEndDate: Date;
  newGoalTodos: Array<Todo> = [];
  newGoalPrio: number;
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
    const goal = new Goal(this.newGoalName, this.newGoalWhy, this.newGoalTodos.length, this.newGoalPrio);
    console.log("goal Created with Uid: " + goal.id)
    goal.steps = this.newGoalSteps;
    goal.category = this.newGoalCategory;
    goal.desc = this.newGoalDesc;
    goal.picture = this.newGoalPic;
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
        el.externalId = goal.id;
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
    this.newGoalPic = "";
    this.goals.getValue().sort(this.sortGoals('prio'));
    this.router.navigateByUrl('/tabs/goals');

  }
  checkAllIsDone() {
    this.goals.getValue().forEach(goal => {
      if (this.checkIfDone(goal) == true) {
        goal.activ = false;
      }
    });
  }
  private checkIfDone(goal: Goal) {
    let isDone = true
    let todos = this.todoService.getTodosFromGoal(goal.todoIds);
    todos.forEach(element => {
      if (!element.done)
        isDone = false
    });

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
    this.updateGoal();
  }


  public updateGoal() {
    this.localDb.set('goals', this.goals.getValue());
  }
  public deleteGoal(goal: Goal) {
    this.todoService.deleteAllTodosFromGoal(goal);
    const index: number = this.goals.getValue().indexOf(goal);
    if (index !== -1) {
      this.goals.getValue().splice(index, 1);
    }
    this.updateGoal();

  }
  sortGoals(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
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