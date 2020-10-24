import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGoalPrioPage } from './new-goal-prio.page';

const routes: Routes = [
  {
    path: '',
    component: NewGoalPrioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGoalPrioPageRoutingModule {}
