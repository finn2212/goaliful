import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ModalController, PickerController } from '@ionic/angular';
import { CalModalPage } from '../calendar/cal-modal/cal-modal.page';
import { PickerOptions } from "@ionic/core";


@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {

  state: string;

  taskList; // Array to store tasks



  constructor(
    private todoService: TodoService,
    private modalCtrl: ModalController,
    private pickerController: PickerController

  ) {
    this.todoService.getTodosObservable().subscribe(res => {
      console.log('new Value: ', res);
      this.taskList = res;
    });

    this.state = "today";
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("settodostates")
    this.todoService.setTodoStates();
  }
  segmentChanged(ev: any) {
    console.log(ev.detail.value);

    this.state = ev.detail.value;
  }




  // deleteTask Function
  // When user clicks the delete task button, this function is called with index i as parameter
  // Since tasks are added to taskList, we delete the task at index i using splice() array method
  // This deletes only that task at index i
  deleteTask(index) {
    this.todoService.deleteTodo(index);
  }




  async openTodoModal(index) {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;

        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        console.log(event);
        this.todoService.addToCalender(event, index);

      }
    });
    await modal.present();

  }

}
