import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsPage } from './goals.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsPage
  },
  {
    path: 'new-goal',
    loadChildren: () => import('./new-goal/new-goal.module').then( m => m.NewGoalPageModule)
  },
  {
    path: 'new-goal-why',
    loadChildren: () => import('./new-goal-why/new-goal-why.module').then( m => m.NewGoalWhyPageModule)
  },
  {
    path: 'new-goal-submit',
    loadChildren: () => import('./new-goal-submit/new-goal-submit.module').then( m => m.NewGoalSubmitPageModule)
  },
  {
    path: 'choose-category',
    loadChildren: () => import('./choose-category/choose-category.module').then( m => m.ChooseCategoryPageModule)
  },
  {
    path: 'goal-detail',
    loadChildren: () => import('./goal-detail/goal-detail.module').then( m => m.GoalDetailPageModule)
  },
  {
    path: 'goal-todos',
    loadChildren: () => import('./goal-todos/goal-todos.module').then( m => m.GoalTodosPageModule)
  },
  {
    path: 'new-goal-pic',
    loadChildren: () => import('./new-goal-pic/new-goal-pic.module').then( m => m.NewGoalPicPageModule)
  },
  {
    path: 'new-goal-prio',
    loadChildren: () => import('./new-goal-prio/new-goal-prio.module').then( m => m.NewGoalPrioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsPageRoutingModule {}
