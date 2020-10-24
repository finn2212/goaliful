import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGoalPicPage } from './new-goal-pic.page';

const routes: Routes = [
  {
    path: '',
    component: NewGoalPicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGoalPicPageRoutingModule {}
