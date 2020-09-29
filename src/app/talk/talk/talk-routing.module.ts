import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkPage } from './talk.page';

const routes: Routes = [
  {
    path: '',
    component: TalkPage
  },
  {
    path: 'talk-detail',
    loadChildren: () => import('../talk-detail/talk-detail.module').then(m => m.TalkDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalkPageRoutingModule { }
