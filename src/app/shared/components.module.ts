import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailyTodosComponent } from '../dashboard/daily-todos/daily-todos.component';
import { AddtodoComponent } from '../todos/addtodo/addtodo.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AddtodoComponent, DailyTodosComponent],
  imports: [
    FormsModule,
    IonicModule
  ],
  exports: [AddtodoComponent,DailyTodosComponent]
})
export class ComponentsModule { }