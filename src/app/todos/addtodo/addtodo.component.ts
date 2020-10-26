import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss'],
})
export class AddtodoComponent implements OnInit {

  constructor(private pickerController: PickerController, private todoService: TodoService) { }

  prio: number = 1;
  taskName: string = '';

  prios: number[] = [1, 2, 3, 4, 5];

  ngOnInit() { }

  addTask() {
    console.log(this.taskName)
    if (this.taskName.length > 0) {

      this.todoService.addTodo(this.taskName, 'sometime', this.prio);
      this.taskName = "";
      this.prio = 1;
    }
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
