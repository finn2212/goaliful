import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageRoutingModule } from './cal-modal-routing.module';
import { registerLocaleData } from '@angular/common';
import { CalModalPage } from './cal-modal.page';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalModalPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalModalPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
})
export class CalModalPageModule { }
