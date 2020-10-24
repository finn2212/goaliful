import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoalsService } from '../goals.service'
import { Router } from '@angular/router';
import { Goal } from '../../models/goal';
import { GoalStep } from '../../models/goalStep'
import { TodoService } from 'src/app/todos/todo.service';
import { Todo } from 'src/app/models/todo';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";

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
  done = 0;
  notDone = 0;

  newTodoName = "";
  prio: number = 1;

  prios: number[] = [1, 2, 3, 4, 5];

  constructor(private goalsService: GoalsService,
    private router: Router, private todoService: TodoService, private pickerController: PickerController

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

      const newTodo = new Todo(this.newTodoName, 'sometime', this.prio);
      newTodo.externalId = this.goal.id;
      this.goalsService.addTodosToGoal(newTodo);
      this.todoService.addSingleTodo(newTodo);
    }
    this.newTodoName = "";
    this.prio = 1;
    this.getTodosFromGoal();

  }
  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.prio = value.prios.value
            console.log(value.prios.value);
          }
        }
      ],
      columns: [{
        name: 'prios',
        options: this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }

  getColumnOptions() {
    let options = [];
    this.prios.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }




  changeMode() {
    this.mode = !this.mode;
    console.log(this.mode);
  }
  getTodosFromGoal() {
    if (this.goal) {

      this.goalTodos = this.goalsService.getTodosFromGoal(this.goal);
      this.done = 0;
      this.notDone = 0;

      this.goalTodos.forEach(element => {
        console.log(element);
        if (element.done) {
          this.done = this.done + 1;
        } else {
          this.notDone = this.notDone + 1
        }

      });
      console.log(this.done);
      console.log(this.notDone);


    }
  }


}
