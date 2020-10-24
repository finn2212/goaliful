import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../goals.service';
import { Todo } from 'src/app/models/todo';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-goal-todos',
  templateUrl: './goal-todos.page.html',
  styleUrls: ['./goal-todos.page.scss'],
})
export class GoalTodosPage implements OnInit {
  newGoal: string;
  newTodos: Array<Todo>;
  taskName: string;
  prios: number[] = [1, 2, 3, 4, 5];
  prio: number = 1;
  constructor(
    private goalService: GoalsService,
    private router: Router,
    private pickerController: PickerController) {
    this.newTodos = new Array();
  }


  ngOnInit() {
    if (this.goalService.newGoalName)
      this.newGoal = this.goalService.newGoalName;
  }
  addTask() {
    if (this.taskName.length > 0) {
      const newTodo = new Todo(this.taskName, 'sometime', this.prio);
      this.newTodos.push(newTodo);
    }
    this.taskName = "";

  }

  continue() {
    this.newTodos.forEach(el => {
      if (!this.goalService.newGoalTodos.includes(el)) {
        this.goalService.newGoalTodos.push(el);
      }
    })

    this.router.navigateByUrl('/tabs/goals/new-goal-submit');

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




}
