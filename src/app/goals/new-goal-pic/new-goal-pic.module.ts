import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGoalPicPageRoutingModule } from './new-goal-pic-routing.module';

import { NewGoalPicPage } from './new-goal-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGoalPicPageRoutingModule
  ],
  declarations: [NewGoalPicPage]
})
export class NewGoalPicPageModule {}
