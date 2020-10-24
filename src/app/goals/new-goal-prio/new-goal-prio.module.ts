import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGoalPrioPageRoutingModule } from './new-goal-prio-routing.module';

import { NewGoalPrioPage } from './new-goal-prio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGoalPrioPageRoutingModule
  ],
  declarations: [NewGoalPrioPage]
})
export class NewGoalPrioPageModule {}
