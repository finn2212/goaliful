import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkDetailPage } from './talk-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TalkDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalkDetailPageRoutingModule {}
