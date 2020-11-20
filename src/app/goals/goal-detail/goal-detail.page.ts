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
import { Category } from '../../models/category'

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
  selectedGoal: Goal;
  mode: boolean;
  goalTodos = new Array<Todo>();
  done = 0;
  notDone = 0;

  newTodoName = "";
  prio: number = 1;
  goals;
  prios: number[] = [1, 2, 3, 4, 5];
  cats: any[] = [{ "text": " Arbeit und Karriere", "id": 1 }, { "text": " Gesundheit und Wohlbefinden", "id": 2 }, { "text": " Liebe Beziehung,", "id": 3 }, { "text": "Geld Finanzen", "id": 4 }, { "text": " Familie Freunde", "id": 5 }, { "text": "  Phychologisches Wohlbefinden,", "id": 6 }, { "text": " Freizeit Lebensstil,", "id": 7 }, { "text": " Persöhnliches Wachstum,", "id": 8 }, { "text": " Anderes Ziel,", "id": 9 }];




  constructor(private goalsService: GoalsService,
    private router: Router, private todoService: TodoService, private pickerController: PickerController

  ) {
    this.goalsService.getGoalsObservable().subscribe(res => {
      console.log('new Value: ', res);
      this.goals = res;
    });


  }

  chanceCategory() {
    console.log("Categorie");
    this.showCatPicker();
  }

  ngOnInit() {
    this.selectedGoal = this.goalsService.selectedGoal;
    if (!this.selectedGoal) {
      this.router.navigateByUrl('/tabs/goals');
    }

  }
  ionViewWillEnter() {
    this.selectedGoal = this.goalsService.selectedGoal;
    this.todoService.isGoalDeatail = true;
    this.getTodosFromGoal();
    this.calcProceed()
    console.log(this.goals);
  }
  ionViewWillLeave() {
    this.todoService.isGoalDeatail = false;
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
      // newTodo.externalId = this.goal.id;
      this.goalsService.addTodosToGoal(newTodo);
      this.todoService.addSingleTodo(newTodo);
    }
    this.newTodoName = "";
    this.prio = 1;
    this.getTodosFromGoal();
    this.calcProceed();

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
  async showCatPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.goals.forEach(goal => {
              if (this.selectedGoal.id === goal.id) {
                goal.category = Category[value.cats.value];
              }
            });

          }
        }
      ],
      columns: [{
        name: 'cats',
        options: this.getColumnCatOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }
  getColumnCatOptions() {
    let options = [];
    this.cats.forEach(x => {
      options.push({ text: x.text, value: x.id });
    });
    return options;
  }





  getTodosFromGoal() {
    if (this.selectedGoal) {

      this.goalTodos = this.goalsService.getTodosFromGoal(this.selectedGoal);
      this.done = 0;
      this.notDone = 0;


    }
  }
  calcProceed() {
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


