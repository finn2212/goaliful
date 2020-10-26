import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddtodoComponent } from '../todos/addtodo/addtodo.component';



@NgModule({
  declarations: [AddtodoComponent],
  imports: [
    FormsModule,
  ],
  exports: [AddtodoComponent]
})
export class ComponentsModule { }