import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkDetailPageRoutingModule } from './talk-detail-routing.module';

import { TalkDetailPage } from './talk-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalkDetailPageRoutingModule
  ],
  declarations: [TalkDetailPage]
})
export class TalkDetailPageModule {}
